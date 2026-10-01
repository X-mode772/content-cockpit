import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { GenerateCampaignDto } from './dto/generate-campaign.dto';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post('generate')
  generate(@Body() dto: GenerateCampaignDto) {
    return this.campaignsService.generate(dto);
  }

  @Get()
  getAll() {
    return this.campaignsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.campaignsService.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.campaignsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.campaignsService.delete(id);
  }
}
