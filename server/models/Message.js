import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, default: 'system' },
    subject: String,
    body: String,
    read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
