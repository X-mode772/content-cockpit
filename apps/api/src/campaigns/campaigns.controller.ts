import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GenerateCampaignDto } from './dto/generate-campaign.dto';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post('generate')
  async generate(@Request() req: any, @Body() dto: GenerateCampaignDto) {
    return this.campaignsService.generate(req.user.sub, dto);
  }

  @Get()
  async getAll(@Request() req: any) {
    return this.campaignsService.getAll(req.user.sub);
  }

  @Get(':id')
  async getOne(@Request() req: any, @Param('id') id: string) {
    return this.campaignsService.getOne(req.user.sub, id);
  }

  @Put(':id')
  async update(@Request() req: any, @Param('id') id: string, @Body() dto: any) {
    return this.campaignsService.update(req.user.sub, id, dto);
  }

  @Delete(':id')
  async delete(@Request() req: any, @Param('id') id: string) {
    return this.campaignsService.delete(req.user.sub, id);
  }
}
