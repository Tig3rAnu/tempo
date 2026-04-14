import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    name: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    alias: String,
    caption: String,
    image: String,
    gallery: [String],
    duration: { type: Number, default: 0 },
    semester: { type: Number, default: 0 },
    fees: { type: Number, default: 0 },
    fees_details: mongoose.Schema.Types.Mixed,
    other_expenses: mongoose.Schema.Types.Mixed,
    priority: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default mongoose.model('Course', courseSchema);
