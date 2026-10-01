import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'content-cockpit-dev-secret',
      signOptions: { expiresIn: '7d' }
    })
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService]
})
export class CampaignsModule {}
