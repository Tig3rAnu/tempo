import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import University from '../models/University.js';

async function seed() {
    await connectDB(process.env.MONGO_URI || 'mongodb://root:secret@localhost:27017/shiksha?authSource=admin');

    // seed users similar to previous in-memory store
    const users = [
        {
            email: 'admin@shiksha.com',
            phone: '+91-9999999999',
            password: 'admin123',
            role: 'admin',
            name: 'Admin',
            country: 'India',
            verified: true,
            adminApproved: true,
            status: 'active',
            createdAt: '2024-01-01T00:00:00.000Z',
        },
        {
            email: 'student@shiksha.com',
            phone: '+91-8888888888',
            password: 'student123',
            role: 'student',
            name: 'Rahul Kumar',
            country: 'India',
            verified: true,
            adminApproved: true,
            status: 'active',
            createdAt: '2024-06-01T00:00:00.000Z',
        }
        // Add others as needed
    ];

    await User.deleteMany();
    await User.insertMany(users);
    console.log('Users seeded');

    // universities from data/universities.js
    const uniData = await import('../data/universities.js');
    // remove numeric id fields to avoid _id casting errors
    const uniDocs = uniData.UNIVERSITIES.map(u => {
        const { id, ...rest } = u;
        return rest;
    });
    await University.deleteMany();
    await University.insertMany(uniDocs);
    console.log(`Universities seeded (${uniDocs.length} records)`);

    mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
