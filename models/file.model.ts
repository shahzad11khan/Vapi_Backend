import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
    pdfFile: {
        path: String,
        fileName: String,
    };
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
}

const FileSchema: Schema = new Schema(
    {
        pdfFile: {
            path : { type: String, required: true },
            fileName : { type: String, required: true }
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

export default mongoose.model<IFile>('File', FileSchema);