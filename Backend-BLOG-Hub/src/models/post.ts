import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    images: string[];
    author: Types.ObjectId;
    category: 'Technology' | 'Science' | 'Space';
    // likes: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true, enum: ['Technology', 'Science', 'Space'] },
        images: { type: [String], default: [] },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        // likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    },
    {
        timestamps: true,
    }
);

// Export the model
export default mongoose.model<IPost>('Post', PostSchema);
