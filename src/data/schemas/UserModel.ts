import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  password: string;
  email: string;
  phones: { number: string; area: string }[];
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

export const userSchema: Schema = new Schema({
  id: String,
  name: { type: String, required: true },
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
  phones: [{ number: String, area: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: Date
});

export default mongoose.model<IUser>('User', userSchema);
