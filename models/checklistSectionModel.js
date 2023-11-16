import mongoose from 'mongoose';
import { v4 } from 'uuid';

const checklistSectionSchema = new mongoose.Schema(
  {
    _id: { type: String, default: v4 },
    name: {
      type: String,
      required: [true, 'A checklist section needs a name'],
    },
    order: {
      type: Number,
      required: [true, 'A checklist section needs an order'],
    },
    checklist: { type: String, required: true, ref: 'Checklist' },
  },
  {
    timestamps: true,
  },
);

checklistSectionSchema.index({ checklist: 1, order: 1 }, { unique: true });

global.ChecklistSection =
  global.ChecklistSection || mongoose.model('ChecklistSection', checklistSectionSchema);

module.exports = global.ChecklistSection;
