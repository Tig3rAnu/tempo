import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'student', 'university', 'agent', 'parent'],
        default: 'student'
    },
    name: { type: String },
    country: { type: String },
    verified: { type: Boolean, default: false },
    adminApproved: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'pending_admin', 'inactive', 'pending_verification'], default: 'active' },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
