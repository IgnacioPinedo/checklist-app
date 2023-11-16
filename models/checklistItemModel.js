import mongoose from 'mongoose';
import { v4 } from 'uuid';

const checklistItemSchema = new mongoose.Schema(
  {
    _id: { type: String, default: v4 },
    name: {
      type: String,
      required: [true, 'A checklist item needs a name'],
    },
    order: {
      type: Number,
      required: [true, 'A checklist item needs an order'],
    },
    checklistSection: { type: String, required: true, ref: 'ChecklistSection' },
  },
  {
    timestamps: true,
  },
);

checklistItemSchema.index({ checklistSection: 1, order: 1 }, { unique: true });

global.ChecklistItem = global.ChecklistItem || mongoose.model('ChecklistItem', checklistItemSchema);

module.exports = global.ChecklistItem;
