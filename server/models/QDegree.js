import mongoose from 'mongoose';

const qDegreeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
});

export default mongoose.model('QDegree', qDegreeSchema);
