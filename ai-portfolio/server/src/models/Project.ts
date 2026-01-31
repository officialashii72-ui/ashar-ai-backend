import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    results: Record<string, any>;
    category: string;
    featured: boolean;
    order: number;
}

const ProjectSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        technologies: [{ type: String }],
        results: { type: Map, of: String },
        category: { type: String, required: true },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
