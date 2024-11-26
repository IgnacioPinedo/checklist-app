import mongoose from 'mongoose';
import { v4 } from 'uuid';

const checklistSchema = new mongoose.Schema(
  {
    _id: { type: String, default: v4 },
    name: {
      type: String,
      required: [true, 'A checklist needs a name'],
    },
    slug: {
      type: String,
      required: [true, 'A checklist needs a slug'],
    },
    // description: {
    //   type: String,
    //   required: [true, 'A checklist needs a description'],
    // },
  },
  {
    timestamps: true,
  },
);

global.Checklist = global.Checklist || mongoose.model('Checklist', checklistSchema);

module.exports = global.Checklist;
