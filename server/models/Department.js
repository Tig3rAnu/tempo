import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null }
});

export default mongoose.model('Department', departmentSchema);
