// src/models/Template.ts
import { Schema, model } from 'mongoose';

const TemplateParamOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true }
  },
  { _id: false }
);

const TemplateParamSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: {
      type: String,
      enum: ['number', 'color', 'select', 'boolean'],
      required: true
    },
    min: Number,
    max: Number,
    step: Number,
    options: [TemplateParamOptionSchema],
    defaultValue: Schema.Types.Mixed,
    unit: String,
    cssVar: String
  },
  { _id: false }
);

const TemplateSchema = new Schema(
  {
    _id: { type: String }, // slug, ex: "card-basic"
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    html: { type: String, required: true },
    css: { type: String, required: true },
    params: { type: [TemplateParamSchema], default: [] },
    tags: [String],
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const TemplateModel = model('Template', TemplateSchema);
