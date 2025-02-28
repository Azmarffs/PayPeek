import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  photoURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Check if the model already exists to prevent overwriting
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;