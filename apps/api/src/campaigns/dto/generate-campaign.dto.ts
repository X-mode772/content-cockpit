import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class GenerateCampaignDto {
  @IsUrl({}, { require_tld: false })
  websiteUrl: string;

  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  tone?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  platforms?: string[];
}
