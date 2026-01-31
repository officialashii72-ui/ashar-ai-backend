import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
    name: string;
    company: string;
    role: string;
    content: string;
    image: string;
    featured: boolean;
    rating: number;
}

const TestimonialSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        company: { type: String },
        role: { type: String },
        content: { type: String, required: true },
        image: { type: String },
        featured: { type: Boolean, default: false },
        rating: { type: Number, default: 5 },
    },
    { timestamps: true }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
