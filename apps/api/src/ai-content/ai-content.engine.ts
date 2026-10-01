import { Injectable } from '@nestjs/common';
import { WebsiteAnalysis } from './website-analyzer.service';

interface ContentPrompt {
  companyName: string;
  website: string;
  tone: string;
  platform: string;
  dayOfWeek: number;
}

interface GeneratedPost {
  platform: string;
  day: number;
  headline: string;
  content: string;
  hashtags: string[];
  cta: string;
  type: 'reels' | 'carousel' | 'story' | 'post';
}

@Injectable()
export class AIContentEngine {
  private contentTemplates = {
    Instagram: [
      'product_highlight',
      'behind_the_scenes',
      'customer_testimonial',
      'educational_tip',
      'user_generated_content',
      'trending_audio',
      'call_to_action'
    ],
    LinkedIn: [
      'industry_insight',
      'thought_leadership',
      'company_culture',
      'case_study',
      'career_opportunity',
      'company_news',
      'professional_tip'
    ],
    Facebook: [
      'community_engagement',
      'event_announcement',
      'special_offer',
      'customer_story',
      'interactive_post',
      'educational_content',
      'company_update'
    ],
    'X / Twitter': [
      'quick_tip',
      'industry_news',
      'conversation_starter',
      'link_share',
      'thread_starter',
      'trending_topic',
      'call_to_action'
    ]
  };

  generateCampaignInsights(analysis: WebsiteAnalysis, companyName: string): any {
    const keywords = analysis.keywords || [];
    const headings = analysis.headings || [];
    const mainHeading = headings[0] || companyName;

    return {
      company: companyName,
      website: analysis.url,
      title: analysis.title || mainHeading,
      description: analysis.description || 'Website-basierte Kampagne',
      keywords,
      mainTopic: mainHeading,
      audience: this.inferAudience(analysis),
      contentThemes: this.generateContentThemes(analysis),
      objective: 'Erhöhte Sichtbarkeit, Engagement und Lead-Generierung',
      suggestedTone: 'professionell, vertrauenswürdig und kundenorientiert'
    };
  }

  generateSevenDayPlan(companyName: string, analysis: WebsiteAnalysis, tone: string, platforms: string[]): GeneratedPost[] {
    const posts: GeneratedPost[] = [];
    const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
    const themes = this.generateContentThemes(analysis);
    const keywords = analysis.keywords || [];

    let themeIndex = 0;

    platforms.forEach(platform => {
      for (let day = 0; day < 7; day++) {
        const theme = themes[themeIndex % themes.length];
        const postType = this.selectPostType(platform, day);
        const content = this.generatePost({
          platform,
          companyName,
          theme,
          day: day + 1,
          tone,
          keywords,
          postType
        });

        posts.push({
          platform,
          day: day + 1,
          headline: content.headline,
          content: content.body,
          hashtags: this.generateHashtags(theme, companyName, platform),
          cta: this.generateCTA(platform),
          type: postType
        });

        themeIndex++;
      }
    });

    return posts;
  }

  private inferAudience(analysis: WebsiteAnalysis): string {
    const keywords = (analysis.keywords || []).join(' ').toLowerCase();
    const title = (analysis.title || '').toLowerCase();
    const description = (analysis.description || '').toLowerCase();
    const combined = `${keywords} ${title} ${description}`;

    if (combined.includes('b2b') || combined.includes('unternehmen') || combined.includes('business')) {
      return 'Geschäftsentscheidungsträger und Unternehmensleiter';
    }
    if (combined.includes('e-commerce') || combined.includes('shop') || combined.includes('produkt')) {
      return 'Verbraucher und Online-Käufer';
    }
    if (combined.includes('bildung') || combined.includes('kurs') || combined.includes('training')) {
      return 'Lernende und Weiterbildungsinteressierte';
    }
    return 'Zielgerichtete Geschäfts- und Kundengruppen';
  }

  private generateContentThemes(analysis: WebsiteAnalysis): string[] {
    const headings = analysis.headings || [];
    const keywords = analysis.keywords || [];

    const themes = [
      `${analysis.title || 'Angebot'} - Produkthighlights`,
      `Warum ${headings[0] || 'wir'} die beste Wahl`,
      'Kundenerfolgsgeschichten und Testimonials',
      'Branchentrends und Insights',
      'Team und Unternehmenskultur',
      'Tipps und Best Practices',
      'Spezialangebote und Promotionen'
    ];

    return themes;
  }

  private selectPostType(platform: string, day: number): 'reels' | 'carousel' | 'story' | 'post' {
    if (platform === 'Instagram') {
      const types: ('reels' | 'carousel' | 'story' | 'post')[] = ['reels', 'carousel', 'post', 'story', 'post', 'carousel', 'reels'];
      return types[day % types.length];
    }
    if (platform === 'Facebook') {
      return day % 2 === 0 ? 'carousel' : 'post';
    }
    return 'post';
  }

  private generatePost(options: any): { headline: string; body: string } {
    const { platform, companyName, theme, day, tone, postType } = options;

    const headlines: Record<string, string[]> = {
      'Produkthighlights': [
        `Entdecke die Power von ${companyName}`,
        `${companyName}: Deine Lösung für...`,
        `Das Beste aus unserem Sortiment`
      ],
      'Warum wir': [
        `3 Gründe, warum ${companyName}`,
        `Hier ist, warum du uns wählen solltest`,
        `Das unterscheidet uns von der Konkurrenz`
      ],
      'Kundenerfolgsgeschichten': [
        `Kundenerfolgsstory: Das hat sich verändert`,
        `Echte Ergebnisse von echten Kunden`,
        `Wie ${companyName} das Problem löste`
      ],
      'Branchentrends': [
        `Die Top-Trends in dieser Woche`,
        `Das solltest du über [Trend] wissen`,
        `Zukunftssicher: Was ändert sich gerade`
      ]
    };

    const bodies: Record<string, string[]> = {
      'Produkthighlights': [
        `Unser neustes Angebot bringt dich weiter. Erfahre, wie ${companyName} deine Anforderungen erfüllt und dich zur nächsten Stufe bringt. Besuche unsere Website!`,
        `${companyName} steht für Qualität, Innovation und Kundenzufriedenheit. Sieh selbst, warum hunderte Kunden uns vertrauen.`,
        `Mit ${companyName} erreichst du deine Ziele schneller. Lass dich von unserem Angebot inspirieren!`
      ],
      'Warum wir': [
        `1️⃣ Expertise: Jahrelange Erfahrung\n2️⃣ Service: Persönliche Betreuung\n3️⃣ Qualität: Beste Ergebnisse garantiert\n\nErfahre mehr auf unserer Website!`,
        `Was andere über uns sagen? "Beste Entscheidung" – unsere Kunden sprechen für uns. Werde jetzt Teil unserer Community!`,
        `Innovation trifft Tradition. Das ist ${companyName}. Überzeuge dich selbst von unserer Qualität.`
      ],
      'Kundenerfolgsgeschichten': [
        `📈 Erfolgsgeschichte: Ein Kunde hat mit uns 300% ROI erreicht. Erfahre seine Geschichte auf unserem Blog!`,
        `Echte Erfolge von echten Menschen. ${companyName} hilft dir, deine Ziele zu erreichen. Case Study jetzt lesen!`,
        `Von 0 auf 100: So hat ${companyName} einem Kunden geholfen, sein Geschäft zu transformieren. Lies die ganze Story.`
      ]
    };

    const themeKey = theme.split(' - ')[1] || theme;
    const headlineList = headlines[themeKey] || headlines['Produkthighlights'];
    const bodyList = bodies[themeKey] || bodies['Produkthighlights'];

    return {
      headline: headlineList[day % headlineList.length],
      body: bodyList[day % bodyList.length]
    };
  }

  private generateHashtags(theme: string, companyName: string, platform: string): string[] {
    const companyHashtag = `#${companyName.replace(/\s+/g, '').toLowerCase()}`;
    const industryHashtags = ['#marketing', '#socialmedia', '#digital', '#business', '#brandgrowth'];
    const themeHashtags = [
      '#innovation',
      '#success',
      '#community',
      '#insights',
      '#trending',
      '#contentmarketing',
      '#engagement'
    ];

    if (platform === 'Instagram') {
      return [
        companyHashtag,
        ...industryHashtags.slice(0, 3),
        ...themeHashtags.slice(0, 4)
      ];
    }
    if (platform === 'LinkedIn') {
      return [
        companyHashtag,
        '#LinkedIn',
        '#B2B',
        ...themeHashtags.slice(0, 2)
      ];
    }
    if (platform === 'Facebook') {
      return [
        companyHashtag,
        ...industryHashtags.slice(0, 2),
        ...themeHashtags.slice(0, 2)
      ];
    }
    return [companyHashtag, ...themeHashtags.slice(0, 3)];
  }

  private generateCTA(platform: string): string {
    const ctas: Record<string, string[]> = {
      Instagram: [
        '👉 Folge uns für mehr Content',
        '💬 Schreib einen Kommentar',
        '❤️ Like den Beitrag',
        '📱 Link im Profil anklicken'
      ],
      LinkedIn: [
        '🔗 Teile deinen Gedanken in den Kommentaren',
        '👍 Unterstütze diesen Beitrag mit einem Like',
        '📨 Sende mir eine Nachricht',
        '🔔 Folge uns für regelmäßige Insights'
      ],
      Facebook: [
        '👍 Magst du das?',
        '💬 Schreib uns deine Meinung',
        '📱 Besuche unsere Website',
        '🔔 Abonniere unsere Updates'
      ],
      'X / Twitter': [
        '🔄 Retweet wenn du zustimmst',
        '❤️ Favorisieren',
        '💭 Antworte mit deiner Meinung',
        '🔗 Teile mit deinen Followers'
      ]
    };

    const ctaList = ctas[platform] || ctas.Instagram;
    return ctaList[Math.floor(Math.random() * ctaList.length)];
  }
}
