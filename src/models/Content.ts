import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'image' | 'video' | 'pdf' | 'audio' | 'other';
  collectionId: string;
  userId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  fileType: { 
    type: String, 
    required: true, 
    enum: ['image', 'video', 'pdf', 'audio', 'other'] 
  },
  collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
  userId: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Check if the model already exists to prevent overwriting
const Content = mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);

export default Content;