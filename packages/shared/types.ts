export interface Campaign {
  id: string;
  companyName: string;
  brandName: string;
  websiteUrl: string;
  status: 'draft' | 'generated' | 'published' | 'scheduled';
  createdAt: string;
  updatedAt?: string;
  insights?: {
    company: string;
    brand: string;
    website: string;
    tone: string;
    audience: string;
    objective: string;
  };
  posts: Post[];
}

export interface Post {
  id: string;
  platform: 'Instagram' | 'LinkedIn' | 'Facebook' | 'X / Twitter';
  headline: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  createdAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  createdAt: string;
}
