import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: Date;
  gender: string;
  status: number;
  phone: string;
  phoneArea: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}

export const userSchema: Schema<IUser> = new Schema({
  id: String,
  firstname: String,
  lastname: String,
  email: String,
  birthdate: Date,
  gender: String,
  status: Number,
  phone: String,
  phoneArea: String,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
});

export default mongoose.model('User', userSchema);
