import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  title: string;
  description: string;
  price: number;
  coverImage: string;
  userId: string;
  accessType: 'time-based' | 'view-based' | 'permanent';
  accessLimit?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  coverImage: { type: String, required: true },
  userId: { type: String, required: true },
  accessType: { 
    type: String, 
    required: true, 
    enum: ['time-based', 'view-based', 'permanent'] 
  },
  accessLimit: { type: Number },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Check if the model already exists to prevent overwriting
const Collection = mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema);

export default Collection;