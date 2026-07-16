import mongoose from "mongoose";
import {nanoid} from 'nanoid';

const historySchema = new mongoose.Schema({
  historyId: {
    type: String,
    default: () => nanoid(10),
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  prediction: {
    type: String,
    required: true,
  },
  dominantLabel: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
    required: true,
  },
  probabilities: {
    Anxiety: Number,
    Depression: Number,
    Normal: Number,
    Suicidal: Number,
  }
  
},
{
  timestamps: true,
});

const historyModel = mongoose.model.history || mongoose.model('history', historySchema);

export default historyModel;