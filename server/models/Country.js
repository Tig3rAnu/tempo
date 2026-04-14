import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    code: String,
    iso2: String,
    iso3: String,
    capital: String,
    lang: String,
    caption: String,
    gmap: String,
    image: String,
    gallery: [String],
    coordinates: mongoose.Schema.Types.Mixed,
    currency: mongoose.Schema.Types.Mixed,
    population: mongoose.Schema.Types.Mixed,
    neighbours: [String],
    geography: mongoose.Schema.Types.Mixed,
    history: String,
    demographics: mongoose.Schema.Types.Mixed,
    transportation: mongoose.Schema.Types.Mixed,
    economy: mongoose.Schema.Types.Mixed,
    visa_req: String,
    living_cost: Number,
    can_work: { type: Boolean, default: false },
    work_details: String,
    benefits: String,
    note: String,
    priority: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    active: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Country', countrySchema);
