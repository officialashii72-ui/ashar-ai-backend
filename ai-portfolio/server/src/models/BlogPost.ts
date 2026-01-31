import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    category: string;
    tags: string[];
    author: string;
    published: boolean;
    views: number;
}

const BlogPostSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        excerpt: { type: String },
        featuredImage: { type: String },
        category: { type: String },
        tags: [{ type: String }],
        author: { type: String },
        published: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
