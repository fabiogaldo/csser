import type { Template } from '../types/template';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function fetchTemplates(params?: { category?: string; search?: string }): Promise<Template[]> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.search) searchParams.set('search', params.search);

  const url = `${API_URL}/api/templates${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao carregar templates');
  }
  return res.json();
}

export async function fetchTemplateById(id: string): Promise<Template> {
  const res = await fetch(`${API_URL}/api/templates/${id}`);
  if (!res.ok) {
    throw new Error('Erro ao carregar template');
  }
  return res.json();
}
