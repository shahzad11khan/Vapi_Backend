import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  user: mongoose.Types.ObjectId;
  action: string;
  description?: string;
  createdAt: Date;
}

const LogSchema: Schema = new Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action:      { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ILog>('Log', LogSchema);
