import User from '../models/User.js';
import { verificationCodes, generateId } from '../data/store.js';

// helper to create verification codes
function makeCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

export async function register(req, res, next) {
    try {
        const { email, phone, password, role, name, country } = req.body;
        if (!email || !password || !role || !phone) {
            return res.status(400).json({ error: 'Email, phone, password and role required' });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'User already exists' });
        }
        const needsAdminApproval = role === 'agent' || role === 'university';
        const newUser = new User({
            email,
            phone,
            password,
            role,
            name: name || email.split('@')[0],
            country: country || '',
            verified: false,
            emailVerified: false,
            phoneVerified: false,
            documentsUploaded: false,
            adminApproved: !needsAdminApproval,
            status: needsAdminApproval ? 'pending_admin' : 'pending_verification'
        });
        await newUser.save();

        const emailCode = makeCode();
        const phoneCode = makeCode();
        verificationCodes.set(email, { emailCode, phoneCode, expiresAt: Date.now() + 600000 });
        console.log(`[Auth] Email verification code for ${email}: ${emailCode}`);
        console.log(`[Auth] Phone verification code for ${phone}: ${phoneCode}`);

        res.status(201).json({
            message: 'Registration successful. Please verify both your email and phone.',
            userId: newUser._id,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            needsVerification: true,
            needsAdminApproval,
            demoEmailCode: emailCode,
            demoPhoneCode: phoneCode
        });
    } catch (err) {
        next(err);
    }
}

export async function verifyEmail(req, res, next) {
    try {
        const { email, code } = req.body;
        const stored = verificationCodes.get(email);
        if (!stored) return res.status(400).json({ error: 'No verification pending for this email' });
        if (stored.emailCode !== code) return res.status(400).json({ error: 'Invalid email verification code' });
        if (Date.now() > stored.expiresAt) return res.status(400).json({ error: 'Code expired' });
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        user.emailVerified = true;
        if (user.emailVerified && user.phoneVerified) {
            user.verified = true;
            user.status = user.adminApproved ? 'pending_documents' : 'pending_admin';
            verificationCodes.delete(email);
        }
        await user.save();
        res.json({
            message: 'Email verified successfully!',
            emailVerified: true,
            phoneVerified: user.phoneVerified || false,
            bothVerified: user.emailVerified && user.phoneVerified,
            needsAdminApproval: !user.adminApproved
        });
    } catch (err) {
        next(err);
    }
}

export async function verifyPhone(req, res, next) {
    try {
        const { email, code } = req.body;
        const stored = verificationCodes.get(email);
        if (!stored) return res.status(400).json({ error: 'No verification pending' });
        if (stored.phoneCode !== code) return res.status(400).json({ error: 'Invalid phone verification code' });
        if (Date.now() > stored.expiresAt) return res.status(400).json({ error: 'Code expired' });
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        user.phoneVerified = true;
        if (user.emailVerified && user.phoneVerified) {
            user.verified = true;
            user.status = user.adminApproved ? 'pending_documents' : 'pending_admin';
            verificationCodes.delete(email);
        }
        await user.save();
        res.json({
            message: 'Phone verified successfully!',
            emailVerified: user.emailVerified || false,
            phoneVerified: true,
            bothVerified: user.emailVerified && user.phoneVerified,
            needsAdminApproval: !user.adminApproved
        });
    } catch (err) {
        next(err);
    }
}

export async function uploadDocuments(req, res, next) {
    try {
        const { email, documents } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (!user.verified) return res.status(400).json({ error: 'Please verify email and phone first' });

        const requiredTypes = ['identity_proof', 'senior_secondary_marksheet'];
        const uploadedTypes = (documents || []).map(d => d.type);
        const missing = requiredTypes.filter(r => !uploadedTypes.includes(r));
        if (missing.length > 0) {
            const labels = {
                identity_proof: 'Aadhar Card / Passport',
                senior_secondary_marksheet: 'Senior Secondary Marksheet'
            };
            return res.status(400).json({ error: `Missing required documents: ${missing.map(m => labels[m] || m).join(', ')}` });
        }

        user.documents = documents;
        user.documentsUploaded = true;
        if (user.adminApproved && user.verified) {
            user.status = 'active';
        }
        await user.save();
        res.json({
            message: 'Documents uploaded successfully! Your registration is complete.',
            status: user.status,
            isActive: user.status === 'active'
        });
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (!user.verified) {
            return res.status(403).json({ error: 'Please verify your email and phone first', needsVerification: true, emailVerified: user.emailVerified || false, phoneVerified: user.phoneVerified || false });
        }
        if (!user.documentsUploaded && user.role === 'student') {
            return res.status(403).json({ error: 'Please upload required documents to complete registration', needsDocuments: true, email: user.email });
        }
        if (!user.adminApproved) {
            return res.status(403).json({ error: 'Your account is pending admin approval', pendingApproval: true });
        }
        if (user.status !== 'active') {
            return res.status(403).json({ error: 'Account not active' });
        }
        res.json({
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            phone: user.phone,
            country: user.country,
            token: 'token-' + user._id
        });
    } catch (err) {
        next(err);
    }
}

export async function adminLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        // look up user in database with admin role
        const user = await User.findOne({ email, password, role: 'admin' });
        if (!user) {
            return res.status(401).json({ error: 'Invalid admin credentials' });
        }
        // you may wish to enforce additional checks e.g. verified/adminApproved
        res.json({
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            token: 'admin-token-' + user._id
        });
    } catch (err) {
        next(err);
    }
}
