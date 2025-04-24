import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string; // Include this in the interface as well
  companyName: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { 
      type: String, 
      required: true 
    },
    companyName: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Remove confirmPassword before saving and hash password
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (this.confirmPassword !== this.password) {
    return next(new Error('Passwords do not match'));
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Do not hash confirmPassword, just keep it as is
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
