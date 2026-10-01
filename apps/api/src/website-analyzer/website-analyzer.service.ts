import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface WebsiteAnalysis {
  url: string;
  title?: string;
  description?: string;
  keywords?: string[];
  headings?: string[];
  images?: string[];
  textContent?: string;
  language?: string;
  favicon?: string;
}

@Injectable()
export class WebsiteAnalyzerService {
  async analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
    try {
      // Validate URL
      const urlObj = new URL(url);
      const normalizedUrl = urlObj.toString();

      // Fetch website content
      const { data } = await axios.get(normalizedUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ContentCockpit/1.0)'
        },
        maxRedirects: 5
      });

      // Parse HTML
      const $ = cheerio.load(data);

      // Extract metadata
      const title = $('head title').text() || $('meta[property="og:title"]').attr('content') || '';
      const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
      const keywords = ($('meta[name="keywords"]').attr('content') || '').split(',').map(k => k.trim()).filter(k => k);
      const favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '';

      // Extract headings
      const headings: string[] = [];
      $('h1, h2, h3').each((_, el) => {
        const text = $(el).text().trim();
        if (text) headings.push(text);
      });

      // Extract images (first 5)
      const images: string[] = [];
      $('img').each((_, el) => {
        if (images.length < 5) {
          const src = $(el).attr('src') || $(el).attr('data-src');
          if (src) {
            const absoluteUrl = this.resolveUrl(src, normalizedUrl);
            images.push(absoluteUrl);
          }
        }
      });

      // Extract main text content (first 2000 characters)
      const textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 2000);

      // Detect language
      const language = $('html').attr('lang') || 'de';

      return {
        url: normalizedUrl,
        title,
        description,
        keywords,
        headings: headings.slice(0, 10),
        images,
        textContent,
        language,
        favicon: favicon ? this.resolveUrl(favicon, normalizedUrl) : undefined
      };
    } catch (error: any) {
      throw new BadRequestException(`Website-Analyse fehlgeschlagen: ${error.message}`);
    }
  }

  private resolveUrl(href: string, base: string): string {
    try {
      return new URL(href, base).toString();
    } catch {
      return href;
    }
  }

  extractKeywords(text: string): string[] {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3);

    const freq: Record<string, number> = {};
    words.forEach(w => {
      freq[w] = (freq[w] || 0) + 1;
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }
}
