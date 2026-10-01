import { Module } from '@nestjs/common';
import { CampaignsModule } from './campaigns/campaigns.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { WebsiteAnalyzerModule } from './website-analyzer/website-analyzer.module';

@Module({
  imports: [PrismaModule, AuthModule, WebsiteAnalyzerModule, CampaignsModule]
})
export class AppModule {}
