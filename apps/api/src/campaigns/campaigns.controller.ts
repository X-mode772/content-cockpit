import { Controller, Post, Body } from '@nestjs/common';
import { GenerateCampaignDto } from './dto/generate-campaign.dto';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post('generate')
  generate(@Body() dto: GenerateCampaignDto) {
    return this.campaignsService.generate(dto);
  }
}
