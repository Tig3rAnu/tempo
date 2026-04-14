import mongoose from 'mongoose';

const qExamSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
});

export default mongoose.model('QExam', qExamSchema);
