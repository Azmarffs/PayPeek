import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchase extends Document {
  userId: string;
  collectionId: string;
  amount: number;
  paymentMethod: string;
  paymentId: string;
  accessExpires?: Date;
  viewsRemaining?: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseSchema: Schema = new Schema({
  userId: { type: String, required: true },
  collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentId: { type: String, required: true },
  accessExpires: { type: Date },
  viewsRemaining: { type: Number },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Check if the model already exists to prevent overwriting
const Purchase = mongoose.models.Purchase || mongoose.model<IPurchase>('Purchase', PurchaseSchema);

export default Purchase;