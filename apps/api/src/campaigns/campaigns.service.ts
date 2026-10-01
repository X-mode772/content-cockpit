import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateCampaignDto } from './dto/generate-campaign.dto';
import { WebsiteAnalyzerService } from '../website-analyzer/website-analyzer.service';
import { AIContentEngine } from '../ai-content/ai-content.engine';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly websiteAnalyzer: WebsiteAnalyzerService,
    private readonly aiEngine: AIContentEngine
  ) {}

  async generate(userId: string, dto: GenerateCampaignDto) {
    // Analyze website
    const analysis = await this.websiteAnalyzer.analyzeWebsite(dto.websiteUrl);

    // Generate insights
    const insights = this.aiEngine.generateCampaignInsights(analysis, dto.companyName);

    // Generate 7-day content plan
    const posts = this.aiEngine.generateSevenDayPlan(
      dto.companyName,
      analysis,
      dto.tone || 'professionell',
      dto.platforms || ['Instagram', 'LinkedIn', 'Facebook']
    );

    // Create campaign with posts
    const campaign = await this.prisma.campaign.create({
      data: {
        userId,
        websiteUrl: dto.websiteUrl,
        companyName: dto.companyName,
        brandName: dto.brandName,
        tone: dto.tone || 'professionell',
        insights,
        posts: {
          create: posts.map(post => ({
            platform: post.platform,
            headline: post.headline,
            content: `${post.content}\n\n${post.hashtags.join(' ')}\n\n${post.cta}`,
            status: 'draft'
          }))
        }
      },
      include: {
        posts: true
      }
    });

    return campaign;
  }

  async getAll(userId: string) {
    return this.prisma.campaign.findMany({
      where: { userId },
      include: { posts: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getOne(userId: string, campaignId: string) {
    return this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { posts: true }
    });
  }

  async update(userId: string, campaignId: string, dto: any) {
    return this.prisma.campaign.update({
      where: { id: campaignId },
      data: dto,
      include: { posts: true }
    });
  }

  async delete(userId: string, campaignId: string) {
    await this.prisma.campaign.delete({
      where: { id: campaignId }
    });
    return { success: true };
  }
}
