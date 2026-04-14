import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
});

export default mongoose.model('Facility', facilitySchema);
