import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
    title: string;
    description: string;
    price: string;
    features: string[];
    icon: string;
    active: boolean;
    order: number;
}

const ServiceSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        features: [{ type: String }],
        icon: { type: String },
        active: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
