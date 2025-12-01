// src/routes/templates.ts
import { Router } from 'express';
import { TemplateModel } from '../models/Template';

const router = Router();

// GET /api/templates?category=card&search=shadow
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter: any = {};
    if (category) filter.category = category;

    if (search) {
      const s = String(search);
      filter.$or = [
        { name: { $regex: s, $options: 'i' } },
        { description: { $regex: s, $options: 'i' } },
        { tags: { $in: [new RegExp(s, 'i')] } }
      ];
    }

    const templates = await TemplateModel
      .find(filter)
      .sort({ isFeatured: -1, name: 1 });

    res.json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar templates' });
  }
});

// GET /api/templates/:id
router.get('/:id', async (req, res) => {
  try {
    const template = await TemplateModel.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template não encontrado' });
    }
    res.json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar template' });
  }
});

// POST /api/templates (rota "admin" pra você brincar no Postman)
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await TemplateModel.create(data);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Erro ao criar template' });
  }
});

// PUT /api/templates/:id (update)
router.put('/:id', async (req, res) => {
  try {
    const updated = await TemplateModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Template não encontrado' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Erro ao atualizar template' });
  }
});

export default router;
