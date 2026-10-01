import { Controller, Post, Body } from '@nestjs/common';
import { WebsiteAnalyzerService } from './website-analyzer.service';

@Controller('analyzer')
export class AnalyzerController {
  constructor(private readonly analyzerService: WebsiteAnalyzerService) {}

  @Post('analyze')
  async analyze(@Body('url') url: string) {
    return this.analyzerService.analyzeWebsite(url);
  }
}
