import { IsEmail, IsOptional, IsString, IsArray } from 'class-validator';

export class GenerateCampaignDto {
  @IsString()
  companyName: string;

  @IsString()
  websiteUrl: string;

  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsString()
  tone?: string;

  @IsOptional()
  @IsArray()
  platforms?: string[];
}
