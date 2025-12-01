// src/seed/seedTemplates.ts
import dotenv from 'dotenv';
import { connectDb } from '../db';
import { TemplateModel } from '../models/Template';

dotenv.config();

async function seed() {
  const MONGO_URI = process.env.MONGO_URI as string;
  if (!MONGO_URI) {
    console.error('MONGO_URI não definido no .env');
    process.exit(1);
  }

  await connectDb(MONGO_URI);

  const templates = [
    {
      _id: 'card-basic',
      name: 'Card com sombra',
      description: 'Card simples com sombra e borda arredondada.',
      category: 'card',
      html: `<div class="card">
  <h2>Título do card</h2>
  <p>Esse é um exemplo de card personalizável.</p>
</div>`,
      css: `.card {
  --card-radius: 12px;
  --card-padding: 16px;
  --card-bg: #ffffff;
  --card-shadow-strength: 0.2;

  border-radius: var(--card-radius);
  padding: var(--card-padding);
  background: var(--card-bg);
  box-shadow: 0 10px 30px rgba(0,0,0,var(--card-shadow-strength));
  font-family: system-ui, sans-serif;
}`,
      params: [
        {
          id: 'radius',
          label: 'Raio da borda',
          type: 'number',
          min: 0,
          max: 40,
          step: 1,
          defaultValue: 12,
          unit: 'px',
          cssVar: '--card-radius'
        },
        {
          id: 'padding',
          label: 'Padding',
          type: 'number',
          min: 4,
          max: 48,
          step: 2,
          defaultValue: 16,
          unit: 'px',
          cssVar: '--card-padding'
        },
        {
          id: 'bgColor',
          label: 'Cor de fundo',
          type: 'color',
          defaultValue: '#ffffff',
          cssVar: '--card-bg'
        },
        {
          id: 'shadowStrength',
          label: 'Força da sombra',
          type: 'number',
          min: 0,
          max: 0.6,
          step: 0.05,
          defaultValue: 0.2,
          cssVar: '--card-shadow-strength'
        }
      ],
      tags: ['card', 'shadow', 'básico'],
      isFeatured: true
    }
    // aqui você depois adiciona outros templates
  ];

  await TemplateModel.deleteMany({});
  await TemplateModel.insertMany(templates);

  console.log('[Seed] Templates inseridos');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
