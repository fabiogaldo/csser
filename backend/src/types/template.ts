// src/types/template.ts
export type TemplateParamType = 'number' | 'color' | 'select' | 'boolean';

export interface TemplateParamOption {
  label: string;
  value: string | number;
}

export interface TemplateParam {
  id: string;
  label: string;
  type: TemplateParamType;
  min?: number;
  max?: number;
  step?: number;
  options?: TemplateParamOption[];
  defaultValue: string | number | boolean;
  unit?: string;
  cssVar?: string;
}

export type TemplateCategory = 'card' | 'button' | 'layout' | 'animation' | 'misc';

export interface Template {
  _id: string; // slug
  name: string;
  description?: string;
  category: TemplateCategory;
  html: string;
  css: string;
  params: TemplateParam[];
  tags?: string[];
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
