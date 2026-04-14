import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
});

export default mongoose.model('Level', levelSchema);
