import { Injectable } from '@nestjs/common';
import { GenerateCampaignDto } from './dto/generate-campaign.dto';

@Injectable()
export class CampaignsService {
  generate(dto: GenerateCampaignDto) {
    const content = [
      'Produkt-Highlight: Zeige dein Angebot mit klaren USPs und einer starken Call-to-Action.',
      'Behind the scenes: Teile den Prozess, das Team und die Werte deines Unternehmens.',
      'Customer proof: Veröffentliche ein kurzes Testimonial oder Erfahrungsbild.',
      'Content-Upgrade: Biete ein gratis PDF, Checklist oder Mini-Guide an.',
      'Fokus auf Mehrwert: Erkläre in 3 Punkten, wie Kunden von deinem Angebot profitieren.',
      'Social proof: Nutze Statistiken, Erfolge oder Kennzahlen als Reels/Post-Content.',
      'Kampagnen-CTA: Fordere Kommentare, Shares oder Direktanfragen mit klarer CTA an.'
    ];

    const posts = (dto.platforms || ['Instagram', 'LinkedIn', 'Facebook']).map((platform, index) => ({
      id: `${platform.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
      platform,
      content: `🚀 ${dto.companyName || 'Dein Unternehmen'} präsentiert: ${content[index % content.length]}

Website: ${dto.websiteUrl}
Tone: ${dto.tone || 'professionell'}

#${(dto.companyName || 'Business').replace(/\s+/g, '').toLowerCase()} #marketing #socialmedia #growth #contentstrategy`
` 
    }));

    return {
      id: `campaign-${Date.now()}`,
      websiteUrl: dto.websiteUrl,
      status: 'generated',
      brandName: dto.brandName || 'Neues Team',
      companyName: dto.companyName || 'Dein Unternehmen',
      createdAt: new Date().toISOString(),
      posts
    };
  }
}
