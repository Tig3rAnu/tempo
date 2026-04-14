import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
