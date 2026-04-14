import User from '../models/User.js';
import University from '../models/University.js';
import Country from '../models/Country.js';
import Facility from '../models/Facility.js';
import Department from '../models/Department.js';
import Intake from '../models/Intake.js';
import Level from '../models/Level.js';
import QExam from '../models/QExam.js';
import QDegree from '../models/QDegree.js';
import Course from '../models/Course.js';
import Message from '../models/Message.js';
import { v4 as uuidv4 } from 'uuid';

// in-memory activity log
const activityLog = [];
function logActivity(action, details, performedBy = 'admin') {
    activityLog.unshift({
        id: uuidv4(),
        action,
        details,
        performedBy,
        createdAt: new Date().toISOString()
    });
    if (activityLog.length > 200) activityLog.pop();
}

export async function getStats(req, res, next) {
    try {
        const totalUsers = await User.countDocuments();
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalAgents = await User.countDocuments({ role: 'agent' });
        const totalUniversities = await University.countDocuments();
        res.json({ totalUsers, totalStudents, totalAgents, totalUniversities });
    } catch (err) {
        next(err);
    }
}

export async function listUsers(req, res, next) {
    try {
        const { role, status, search } = req.query;
        let filter = {};
        if (role && role !== 'all') filter.role = role;
        if (status && status !== 'all') filter.status = status;
        if (search) {
            const q = new RegExp(search, 'i');
            filter.$or = [
                { name: q },
                { email: q },
                { phone: q },
                { country: q },
                { _id: q }
            ];
        }
        const users = await User.find(filter);
        const data = users.map(u => ({
            id: u._id,
            email: u.email,
            phone: u.phone,
            name: u.name,
            role: u.role,
            country: u.country,
            verified: u.verified,
            adminApproved: u.adminApproved,
            status: u.status,
            createdAt: u.createdAt,
            emailVerified: u.emailVerified || false,
            phoneVerified: u.phoneVerified || false,
            documentsUploaded: u.documentsUploaded || false,
            documentsCount: (u.documents || []).length,
            applicationsCount: (u.applications || []).length,
            agentLicense: u.agentLicense || '',
            universityAccreditation: u.universityAccreditation || '',
            parentStudentLink: u.parentStudentLink || '',
            notes: u.notes || ''
        }));
        res.json({ total: data.length, data });
    } catch (err) {
        next(err);
    }
}

export async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { password, ...safe } = user.toObject();
        res.json(safe);
    } catch (err) {
        next(err);
    }
}

export async function createUser(req, res, next) {
    try {
        const { email, phone, password, role, name, country, notes, agentLicense, universityAccreditation, parentStudentLink } = req.body;
        if (!email || !role || !name) {
            return res.status(400).json({ error: 'Name, email and role required' });
        }
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: 'User with this email already exists' });
        const newUser = new User({
            email,
            phone: phone || '',
            password: password || 'default123',
            role,
            name,
            country: country || '',
            verified: true,
            emailVerified: true,
            phoneVerified: true,
            documentsUploaded: role !== 'student',
            adminApproved: true,
            status: 'active',
            notes: notes || '',
            agentLicense: agentLicense || '',
            universityAccreditation: universityAccreditation || '',
            parentStudentLink: parentStudentLink || ''
        });
        await newUser.save();
        logActivity('user_created', `Created ${role}: ${name} (${email})`);
        const { password: pw, ...safe } = newUser.toObject();
        res.status(201).json({ message: 'User created successfully', user: safe });
    } catch (err) {
        next(err);
    }
}

// approval / status helpers
async function changeUserStatus(id, changes) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    Object.assign(user, changes);
    await user.save();
    return user;
}

export async function approveUser(req, res, next) {
    try {
        const user = await changeUserStatus(req.params.id, {
            adminApproved: true,
            status: user.verified
                ? (user.documentsUploaded || user.role !== 'student' ? 'active' : 'pending_documents')
                : 'pending_verification'
        });
        logActivity('user_approved', `Approved ${user.role}: ${user.name} (${user.email})`);
        await Message.create({
            user: user._id,
            type: 'system',
            subject: 'Account Approved',
            body: 'Your account has been approved by admin. You can now login and use all features.'
        });
        res.json({ message: 'User approved', user: { id: user._id, status: user.status } });
    } catch (err) {
        next(err);
    }
}

export async function rejectUser(req, res, next) {
    try {
        const { reason } = req.body;
        const user = await changeUserStatus(req.params.id, { adminApproved: false, status: 'rejected' });
        logActivity('user_rejected', `Rejected ${user.role}: ${user.name} (${user.email})` + (reason ? ` - ${reason}` : ''));
        await Message.create({
            user: user._id,
            type: 'system',
            subject: 'Account Rejected',
            body: `Your account has been rejected by admin.${reason ? ' Reason: ' + reason : ''} Please contact support.`
        });
        res.json({ message: 'User rejected' });
    } catch (err) {
        next(err);
    }
}

export async function suspendUser(req, res, next) {
    try {
        const { reason } = req.body;
        const user = await changeUserStatus(req.params.id, { status: 'suspended' });
        logActivity('user_suspended', `Suspended ${user.role}: ${user.name}` + (reason ? ` - ${reason}` : ''));
        res.json({ message: 'User suspended' });
    } catch (err) {
        next(err);
    }
}

export async function reactivateUser(req, res, next) {
    try {
        const user = await changeUserStatus(req.params.id, { status: 'active', adminApproved: true, verified: true });
        logActivity('user_reactivated', `Reactivated ${user.role}: ${user.name}`);
        res.json({ message: 'User reactivated' });
    } catch (err) {
        next(err);
    }
}

export async function resetPassword(req, res, next) {
    try {
        const { newPassword } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        user.password = newPassword || 'reset123';
        await user.save();
        logActivity('password_reset', `Reset password for ${user.name} (${user.email})`);
        res.json({ message: 'Password reset successfully', tempPassword: user.password });
    } catch (err) { next(err); }
}

export async function deleteUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        logActivity('user_deleted', `Deleted ${user.role}: ${user.name} (${user.email})`);
        res.json({ message: 'User deleted' });
    } catch (err) { next(err); }
}

export async function updateUser(req, res, next) {
    try {
        const updates = req.body;
        if (updates.email) {
            const existing = await User.findOne({ email: updates.email, _id: { $ne: req.params.id } });
            if (existing) return res.status(409).json({ error: 'Email already in use by another user' });
        }
        const user = await changeUserStatus(req.params.id, updates);
        res.json({ message: 'User updated', user });
    } catch (err) { next(err); }
}

// generic CRUD helpers for simple models
async function listModel(Model) {
    return await Model.find();
}

export async function listCountries(req, res, next) {
    try {
        const data = await listModel(Country);
        res.json({ total: data.length, data });
    } catch (err) { next(err); }
}

export async function getCountry(req, res, next) {
    try {
        const item = await Country.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Country not found' });
        res.json(item);
    } catch (err) { next(err); }
}

export async function createCountry(req, res, next) {
    try {
        const item = new Country(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) { next(err); }
}

export async function updateCountry(req, res, next) {
    try {
        const item = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ error: 'Country not found' });
        res.json(item);
    } catch (err) { next(err); }
}

export async function deleteCountry(req, res, next) {
    try {
        const item = await Country.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Country not found' });
        res.json({ message: 'Country deleted' });
    } catch (err) { next(err); }
}

// facilities
export async function listFacilities(req, res, next) {
    try { const data = await listModel(Facility); res.json({ total: data.length, data }); } catch (err) { next(err); }
}
export async function createFacility(req, res, next) {
    try { const item = new Facility(req.body); await item.save(); res.status(201).json(item); } catch (err) { next(err); }
}
export async function updateFacility(req, res, next) {
    try { const item = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!item) return res.status(404).json({ error: 'Facility not found' }); res.json(item); } catch (err) { next(err); }
}
export async function deleteFacility(req, res, next) {
    try { const item = await Facility.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ error: 'Facility not found' }); res.json({ message: 'Facility deleted' }); } catch (err) { next(err); }
}

// departments
export async function listDepartments(req, res, next) {
    try { const data = await Department.find().populate('parent'); res.json({ total: data.length, data }); } catch (err) { next(err); }
}
export async function createDepartment(req, res, next) {
    try { const item = new Department(req.body); await item.save(); res.status(201).json(item); } catch (err) { next(err); }
}
export async function updateDepartment(req, res, next) {
    try { const item = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!item) return res.status(404).json({ error: 'Department not found' }); res.json(item); } catch (err) { next(err); }
}
export async function deleteDepartment(req, res, next) {
    try { const item = await Department.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ error: 'Department not found' }); res.json({ message: 'Department deleted' }); } catch (err) { next(err); }
}

// intakes
export async function listIntakes(req, res, next) {
    try { const data = await listModel(Intake); res.json({ total: data.length, data }); } catch (err) { next(err); }
}
export async function createIntake(req, res, next) {
    try { const item = new Intake(req.body); await item.save(); res.status(201).json(item); } catch (err) { next(err); }
}
export async function updateIntake(req, res, next) {
    try { const item = await Intake.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!item) return res.status(404).json({ error: 'Intake not found' }); res.json(item); } catch (err) { next(err); }
}
export async function deleteIntake(req, res, next) {
    try { const item = await Intake.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ error: 'Intake not found' }); res.json({ message: 'Intake deleted' }); } catch (err) { next(err); }
}

// levels
export async function listLevels(req, res, next) {
    try { const data = await listModel(Level); res.json({ total: data.length, data }); } catch (err) { next(err); }
}
export async function createLevel(req, res, next) {
    try { const item = new Level(req.body); await item.save(); res.status(201).json(item); } catch (err) { next(err); }
}
export async function updateLevel(req, res, next) {
    try { const item = await Level.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!item) return res.status(404).json({ error: 'Level not found' }); res.json(item); } catch (err) { next(err); }
}
export async function deleteLevel(req, res, next) {
    try { const item = await Level.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ error: 'Level not found' }); res.json({ message: 'Level deleted' }); } catch (err) { next(err); }
}

// q exams
export async function listQExams(req, res, next) {
    try { const data = await listModel(QExam); res.json({ total: data.length, data }); } catch (err) { next(err); }
}
export async function createQExam(req, res, next) {
    try { const item = new QExam(req.body); await item.save(); res.status(201).json(item); } catch (err) { next(err); }
}
export async function updateQExam(req, res, next) {
    try { const item = await QExam.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!item) return res.status(404).json({ error: 'Exam not found' }); res.json(item); } catch (err) { next(err); }
}
export async function deleteQExam(req, res, next) {
    try { const item = await QExam.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ error: 'Exam not found' }); res.json({ message: 'Exam deleted' }); } catch (err) { next(err); }
}

// q degrees
export async function listQDegrees(req, res, next) {
    try { const data = await listModel(QDegree); res.json({ total: data.length, data }); } catch (err) { next(err); }
}
export async function createQDegree(req, res, next) {
    try { const item = new QDegree(req.body); await item.save(); res.status(201).json(item); } catch (err) { next(err); }
}
export async function updateQDegree(req, res, next) {
    try { const item = await QDegree.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!item) return res.status(404).json({ error: 'Degree not found' }); res.json(item); } catch (err) { next(err); }
}
export async function deleteQDegree(req, res, next) {
    try { const item = await QDegree.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ error: 'Degree not found' }); res.json({ message: 'Degree deleted' }); } catch (err) { next(err); }
}

// courses
export async function listCourses(req, res, next) {
    try {
        const data = await Course.find().populate('university level department');
        res.json({ total: data.length, data });
    } catch (err) { next(err); }
}
export async function getCourse(req, res, next) {
    try {
        const item = await Course.findById(req.params.id).populate('university level department');
        if (!item) return res.status(404).json({ error: 'Course not found' });
        res.json(item);
    } catch (err) { next(err); }
}
export async function createCourse(req, res, next) {
    try { const item = new Course(req.body); await item.save(); res.status(201).json(item); } catch (err) { next(err); }
}
export async function updateCourse(req, res, next) {
    try { const item = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!item) return res.status(404).json({ error: 'Course not found' }); res.json(item); } catch (err) { next(err); }
}
export async function deleteCourse(req, res, next) {
    try { const item = await Course.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ error: 'Course not found' }); res.json({ message: 'Course deleted' }); } catch (err) { next(err); }
}
