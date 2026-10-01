import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateCampaignDto } from './dto/generate-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  generateInsights(companyName: string, websiteUrl: string, tone: string) {
    return {
      company: companyName,
      website: websiteUrl,
      tone,
      audience: 'Unternehmen, Entscheidungsträger und potenzielle Kunden',
      objective: 'Mehr Sichtbarkeit, Vertrauen und konvertierende Leads generieren',
      suggestedTopics: [
        'Produkthighlights und USPs',
        'Kundenerfolgsgeschichten',
        'Branchentrends und Insights',
        'Team und Unternehmenskultur',
        'Tipps und Best Practices',
        'Special Offers und Promotions',
        'Customer Testimonials'
      ]
    };
  }

  generatePosts(companyName: string, websiteUrl: string, tone: string, platforms: string[]) {
    const contentIdeas = [
      'Stelle dein Produkt oder deine Dienstleistung in einer klaren USP-Story vor und zeige den Mehrwert für Kunden.',
      'Teile einen "Behind the Scenes"-Einblick in deinen Prozess, dein Team und deine Werte.',
      'Veröffentliche ein Kunden-Feedback oder eine erfolgreiche Fallstudie als social proof.',
      'Biete ein kostenloses Lead-Magnet oder Mini-Guide an, um Qualifikations- und Anfragen zu erhöhen.',
      'Erkläre in 3 kurzen Punkten, warum Kunden genau bei dir statt bei der Konkurrenz wählen.',
      'Nutze Kennzahlen, Statistiken und Erfolge als starke, glaubwürdige Content-Hooks.'
    ];

    return (platforms || ['Instagram', 'LinkedIn', 'Facebook']).map((platform, index) => ({
      platform,
      headline: `${companyName} – ${platform}`,
      content: `${contentIdeas[index % contentIdeas.length]}

Website: ${websiteUrl}
Tone: ${tone}

#${companyName.replace(/\s+/g, '').toLowerCase()} #marketing #socialmedia #contentstrategy #brandgrowth`,
      status: 'draft'
    }));
  }

  async generate(userId: string, dto: GenerateCampaignDto) {
    const insights = this.generateInsights(dto.companyName, dto.websiteUrl, dto.tone || 'professionell');
    const postsData = this.generatePosts(dto.companyName, dto.websiteUrl, dto.tone || 'professionell', dto.platforms);

    const campaign = await this.prisma.campaign.create({
      data: {
        userId,
        websiteUrl: dto.websiteUrl,
        companyName: dto.companyName,
        brandName: dto.brandName,
        tone: dto.tone || 'professionell',
        insights,
        posts: {
          create: postsData
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
