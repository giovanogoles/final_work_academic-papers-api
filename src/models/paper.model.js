import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'accepted', 'rejected'],
    default: 'submitted',
  },
});

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;