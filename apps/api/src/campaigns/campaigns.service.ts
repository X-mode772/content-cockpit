import { Injectable } from '@nestjs/common';
import { GenerateCampaignDto } from './dto/generate-campaign.dto';

@Injectable()
export class CampaignsService {
  private campaigns: any[] = [];

  generate(dto: GenerateCampaignDto) {
    const normalizedCompany = dto.companyName || 'Dein Unternehmen';
    const normalizedBrand = dto.brandName || 'Your Brand';
    const website = dto.websiteUrl || 'https://deine-website.de';
    const tone = dto.tone || 'professionell und trust-building';

    const insightSummary = {
      company: normalizedCompany,
      brand: normalizedBrand,
      website,
      tone,
      audience: 'Unternehmen, Entscheidungsträger und potenzielle Kunden',
      objective: 'Mehr Sichtbarkeit, Vertrauen und konvertierende Leads generieren'
    };

    const contentIdeas = [
      'Stelle dein Produkt oder deine Dienstleistung in einer klaren USP-Story vor und zeige den Mehrwert für Kunden.',
      'Teile einen "Behind the Scenes"-Einblick in deinen Prozess, dein Team und deine Werte.',
      'Veröffentliche ein Kunden-Feedback oder eine erfolgreiche Fallstudie als social proof.',
      'Biete ein kostenloses Lead-Magnet oder Mini-Guide an, um Qualifikations- und Anfragen zu erhöhen.',
      'Erkläre in 3 kurzen Punkten, warum Kunden genau bei dir statt bei der Konkurrenz wählen.',
      'Nutze Kennzahlen, Statistiken und Erfolge als starke, glaubwürdige Content-Hooks.'
    ];

    const posts = (dto.platforms || ['Instagram', 'LinkedIn', 'Facebook', 'X / Twitter']).map((platform, index) => {
      const headline = `${normalizedCompany} – ${platform}`;
      const body = `${contentIdeas[index % contentIdeas.length]}

Website: ${website}
Key Message: ${insightSummary.objective}
Tone: ${tone}

Call to Action: Frage nach Mehr Informationen, kommentiere oder teile den Beitrag.

#${normalizedCompany.replace(/\s+/g, '').toLowerCase()} #marketing #socialmedia #contentstrategy #brandgrowth`;

      return {
        id: `${platform.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
        platform,
        headline,
        content: body,
        status: 'draft'
      };
    });

    const campaign = {
      id: `campaign-${Date.now()}`,
      websiteUrl: website,
      status: 'generated',
      brandName: normalizedBrand,
      companyName: normalizedCompany,
      createdAt: new Date().toISOString(),
      insights: insightSummary,
      posts
    };

    this.campaigns.push(campaign);
    return campaign;
  }

  getAll() {
    return this.campaigns;
  }

  getOne(id: string) {
    return this.campaigns.find(c => c.id === id);
  }

  update(id: string, dto: any) {
    const campaign = this.campaigns.find(c => c.id === id);
    if (campaign) {
      Object.assign(campaign, dto);
    }
    return campaign;
  }

  delete(id: string) {
    const index = this.campaigns.findIndex(c => c.id === id);
    if (index > -1) {
      this.campaigns.splice(index, 1);
    }
    return { success: true };
  }
}
