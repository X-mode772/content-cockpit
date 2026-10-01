import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { WebsiteAnalyzerModule } from '../website-analyzer/website-analyzer.module';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { AIContentEngine } from '../ai-content/ai-content.engine';

@Module({
  imports: [
    PrismaModule,
    WebsiteAnalyzerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'content-cockpit-dev-secret',
      signOptions: { expiresIn: '7d' }
    })
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, AIContentEngine]
})
export class CampaignsModule {}
