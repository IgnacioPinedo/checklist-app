import mongoose from 'mongoose';
import { v4 } from 'uuid';

const checklistItemSchema = new mongoose.Schema(
  {
    _id: { type: String, default: v4 },
    name: {
      type: String,
      required: [true, 'A checklist item needs a name'],
    },
    checklistSection: { type: String, required: true, ref: 'ChecklistSection' },
  },
  {
    timestamps: true,
  },
);

global.ChecklistItem = global.ChecklistItem || mongoose.model('ChecklistItem', checklistItemSchema);

module.exports = global.ChecklistItem;
