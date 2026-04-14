import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    countryCode: String,
    alias: String,
    caption: String,
    founded: String,
    type: { type: String, enum: ['govt', 'pvt'] },
    gmap: String,
    image: String,
    logo: String,
    gallery: [String],
    bank_statement: { type: Number, default: 0 },
    application_fees: { type: Number, default: 0 },
    benefits: String,
    scholarship: { type: Boolean, default: false },
    scholarship_policy: String,
    note: String,
    prospectus_path: String,
    contract_type: { type: String, enum: ['direct', 'indirect'], default: 'direct' },
    contract_path: String,
    priority: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    // deprecated/old fields kept for compatibility
    programs: [String],
    tuition: String,
    tuitionMin: Number,
    language: String,
    rating: Number,
    worldRanking: Number,
    annualExpenditure: Number
}, { timestamps: true });

export default mongoose.model('University', universitySchema);
