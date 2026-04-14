import Application from '../models/Application.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
import { generateId, verificationCodes } from '../data/store.js'; // generateId only for legacy IDs if needed

export async function apply(req, res, next) {
    try {
        const { studentId, universityId, universityName, documents } = req.body;
        const student = await User.findById(studentId);
        if (!student) return res.status(404).json({ error: 'Student not found' });

        // Check max 2 applications
        const existingApps = await Application.find({ student: studentId, status: { $ne: 'rejected' } });
        if (existingApps.length >= 2) {
            return res.status(400).json({ error: 'Maximum 2 university applications allowed' });
        }

        const requiredDocs = ['passport', 'higher_secondary_marksheet'];
        const isIndian = (student.country || '').toLowerCase() === 'india';
        if (isIndian) requiredDocs.push('aadhar_card', 'neet_card');
        const uploadedTypes = (documents || []).map(d => d.type);
        const missing = requiredDocs.filter(r => !uploadedTypes.includes(r));
        if (missing.length > 0) {
            return res.status(400).json({ error: `Missing required documents: ${missing.join(', ')}` });
        }

        const app = new Application({
            user: studentId,
            university: universityId,
            documents,
            status: 'submitted',
            studentName: student.name,
            studentEmail: student.email,
            universityName: universityName || 'Unknown University'
        });
        await app.save();

        // store reference in student record
        student.applications = student.applications || [];
        student.applications.push(app._id);
        student.documents = documents || [];
        await student.save();

        // notify university user
        const uniUser = await User.findOne({ role: 'university', _id: universityId });
        if (uniUser) {
            await Message.create({
                user: uniUser._id,
                type: 'application',
                subject: `New Application from ${student.name}`,
                body: `Student ${student.name} (${student.email}) has applied with documents: ${uploadedTypes.join(', ')}. Please review and issue admission letter.`,
                applicationId: app._id
            });
        }

        res.status(201).json({ message: 'Application submitted. University has been notified.', application: app });
    } catch (err) {
        next(err);
    }
}

export async function getByUser(req, res, next) {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        let apps;
        if (user.role === 'university') {
            apps = await Application.find({ university: user._id });
        } else if (user.role === 'student') {
            apps = await Application.find({ user: user._id });
        } else if (user.role === 'agent') {
            apps = await Application.find();
        } else {
            apps = [];
        }
        res.json({ total: apps.length, data: apps });
    } catch (err) {
        next(err);
    }
}

async function changeStatus(appId, updates) {
    const app = await Application.findById(appId);
    if (!app) throw new Error('Application not found');
    Object.assign(app, updates);
    app.updatedAt = new Date();
    await app.save();
    return app;
}

export async function issueAdmissionLetter(req, res, next) {
    try {
        const app = await changeStatus(req.params.appId, { admissionLetterIssued: true, status: 'admission_issued' });
        // notify student
        await Message.create({
            user: app.user,
            type: 'admission_letter',
            subject: `Admission Letter from ${app.universityName}`,
            body: `Congratulations! ${app.universityName} has issued your admission letter. Please make a payment of ₹10,000 to download it.`,
            applicationId: app._id,
            attachmentType: 'admission_letter'
        });
        res.json({ message: 'Admission letter issued. Student has been notified.' });
    } catch (err) {
        next(err);
    }
}

export async function payAdmission(req, res, next) {
    try {
        const app = await Application.findById(req.params.appId);
        if (!app) return res.status(404).json({ error: 'Application not found' });
        if (!app.admissionLetterIssued) return res.status(400).json({ error: 'No admission letter issued yet' });
        app.admissionPaymentDone = true;
        app.status = 'payment_completed';
        await app.save();
        res.json({ message: 'Payment of ₹10,000 received. You can now download the admission letter.', downloadUrl: '/admission-letter-' + app._id + '.pdf' });
    } catch (err) {
        next(err);
    }
}

export async function confirmDocuments(req, res, next) {
    try {
        await changeStatus(req.params.appId, { documentsReceivedConfirmed: true });
        res.json({ message: 'Documents receipt confirmed' });
    } catch (err) {
        next(err);
    }
}

export async function sendInvitationLetter(req, res, next) {
    try {
        const app = await changeStatus(req.params.appId, { invitationLetterIssued: true, status: 'invitation_sent' });
        await Message.create({
            user: app.user,
            type: 'invitation_letter',
            subject: `Invitation Letter from ${app.universityName}`,
            body: `${app.universityName} has sent you an invitation letter. Your documents have been received and processed.`,
            applicationId: app._id,
            attachmentType: 'invitation_letter'
        });
        res.json({ message: 'Invitation letter sent to student.' });
    } catch (err) {
        next(err);
    }
}
