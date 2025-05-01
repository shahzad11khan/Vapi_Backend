import mongoose, { Schema, Document } from 'mongoose';

export interface IAssistant extends Document {
    AssistantName: string;
    AssistantType: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
}

const AssistantSchema: Schema = new Schema(
    {
        AssistantName: { type: String, required: true },
        FirstPrompt: { type: String, required: true },
        SystemPrompt: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

export default mongoose.model<IAssistant>('Assistant', AssistantSchema);
