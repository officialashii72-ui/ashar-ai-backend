import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
    siteTitle: string;
    siteDescription: string;
    socialLinks: Record<string, string>;
    contactEmail: string;
    calendlyUrl: string;
    seoData: Record<string, any>;
}

const SiteSettingsSchema: Schema = new Schema(
    {
        siteTitle: { type: String, default: 'Ashar Iftikhar | AI Business Systems' },
        siteDescription: { type: String },
        socialLinks: { type: Map, of: String },
        contactEmail: { type: String },
        calendlyUrl: { type: String },
        seoData: { type: Map, of: String },
    },
    { timestamps: true }
);

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
