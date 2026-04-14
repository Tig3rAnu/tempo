import { Router } from 'express';
import { generateId, inboxMessages } from '../data/store.js';

const router = Router();

let mockTestSubs = [];
let subIdCounter = 7000;

const MOCK_TEST_PLAN = {
    id: 'mock_test_full',
    name: 'Full Mock Test Access',
    price: 2100,
    currency: 'INR',
    priceDisplay: '₹2,100',
    description: 'Unlock all mock tests including FMGE, IELTS, TOEFL, GRE, SAT, GMAT full-length tests. Sample tests are always free.',
    features: [
        'All FMGE full-length subject tests',
        'All FMGE comprehensive mock tests (300 questions)',
        'All IELTS, TOEFL, GRE, SAT, GMAT tests',
        'Detailed answer explanations',
        'Performance analytics',
        'Unlimited attempts',
        'Lifetime access',
    ],
};

// Get plan details
router.get('/plan', (req, res) => {
    res.json({ data: MOCK_TEST_PLAN });
});

// Check if user has active subscription
router.get('/check/:userId', (req, res) => {
    const sub = mockTestSubs.find(s => s.userId === req.params.userId && s.status === 'active');
    res.json({ hasAccess: !!sub, subscription: sub || null });
});

// Subscribe
router.post('/subscribe', (req, res) => {
    const { userId, payerName, payerEmail, payerPhone, paymentMethod } = req.body;
    if (!payerName || !payerEmail) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check existing
    const existing = mockTestSubs.find(s => s.userId === userId && s.status === 'active');
    if (existing) {
        return res.status(400).json({ error: 'You already have an active mock test subscription' });
    }

    const subscription = {
        id: 'MTS-' + (++subIdCounter),
        userId: userId || null,
        planId: 'mock_test_full',
        planName: MOCK_TEST_PLAN.name,
        price: MOCK_TEST_PLAN.price,
        currency: MOCK_TEST_PLAN.currency,
        priceDisplay: MOCK_TEST_PLAN.priceDisplay,
        payerName,
        payerEmail,
        payerPhone: payerPhone || '',
        paymentMethod: paymentMethod || 'card',
        status: 'active',
        confirmationCode: 'SHK-MT-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 4).toUpperCase(),
        createdAt: new Date().toISOString(),
    };

    mockTestSubs.push(subscription);

    if (userId) {
        inboxMessages.push({
            id: generateId(),
            userId,
            type: 'system',
            subject: 'Mock Test Full Access Activated!',
            body: `Congratulations! Your Full Mock Test Access (₹2,100) is now active. Confirmation code: ${subscription.confirmationCode}. You now have access to all mock tests including FMGE full-length tests.`,
            read: false,
            createdAt: new Date().toISOString(),
        });
    }

    res.status(201).json({
        message: 'Mock test subscription activated successfully!',
        subscription,
    });
});

// Get user subscriptions
router.get('/user/:userId', (req, res) => {
    const userSubs = mockTestSubs.filter(s => s.userId === req.params.userId);
    userSubs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ total: userSubs.length, data: userSubs });
});

export default router;
