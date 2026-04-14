import { Router } from 'express';
import { users, generateId, inboxMessages } from '../data/store.js';

const router = Router();

let subscriptions = [];
let subIdCounter = 3000;

const PLANS = {
    basic: {
        id: 'basic',
        name: 'Basic Plan',
        price: 10000,
        currency: 'INR',
        priceDisplay: '₹10,000',
        paymentTiming: 'One-time payment after receiving Admission Letter',
        features: [
            'Admission letter processing',
            'Document verification assistance',
            'University application support',
            'Email support during admission',
            'Application status tracking',
            'Basic visa guidance',
        ],
        description: 'Pay once after receiving your admission letter to continue the admission process with our guided support.',
    },
    premium: {
        id: 'premium',
        name: 'Premium Plan',
        price: 500,
        currency: 'USD',
        priceDisplay: '$500',
        paymentTiming: 'One-time payment for complete end-to-end support',
        features: [
            'Complete admission process guidance',
            'Airport pickup & reception on arrival',
            'Travel assistance to university campus',
            'Hostel arrangement & accommodation setup',
            'Complete university documentation',
            'Student card registration assistance',
            'Library card setup',
            'Local SIM card arrangement',
            'Bank account opening assistance',
            '24/7 dedicated support throughout',
            'Visa application full support',
            'Pre-departure orientation session',
            'Local city orientation tour',
            'Emergency contact support',
        ],
        description: 'All-inclusive premium support from admission to settling in at your university. We handle everything so you can focus on your studies.',
    },
};

// Get plans
router.get('/plans', (req, res) => {
    res.json({ data: Object.values(PLANS) });
});

// Get user subscription
router.get('/user/:userId', (req, res) => {
    const userSubs = subscriptions.filter(s => s.userId === req.params.userId);
    userSubs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ total: userSubs.length, data: userSubs });
});

// Subscribe
router.post('/subscribe', (req, res) => {
    const { userId, planId, payerName, payerEmail, payerPhone, paymentMethod } = req.body;
    if (!planId || !payerName || !payerEmail) {
        return res.status(400).json({ error: 'Plan, name and email are required' });
    }
    const plan = PLANS[planId];
    if (!plan) return res.status(404).json({ error: 'Plan not found' });

    // Check if user already has this plan active
    const existing = subscriptions.find(s => s.userId === userId && s.planId === planId && s.status === 'active');
    if (existing) {
        return res.status(400).json({ error: 'You already have an active subscription for this plan' });
    }

    const subscription = {
        id: 'SUB-' + (++subIdCounter),
        userId: userId || null,
        planId,
        planName: plan.name,
        price: plan.price,
        currency: plan.currency,
        priceDisplay: plan.priceDisplay,
        payerName,
        payerEmail,
        payerPhone: payerPhone || '',
        paymentMethod: paymentMethod || 'card',
        status: 'active',
        confirmationCode: 'SHK-SUB-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 4).toUpperCase(),
        createdAt: new Date().toISOString(),
        features: plan.features,
    };

    subscriptions.push(subscription);

    // Send inbox message
    if (userId) {
        inboxMessages.push({
            id: generateId(),
            userId,
            type: 'system',
            subject: `${plan.name} Subscription Activated!`,
            body: `Congratulations! Your ${plan.name} (${plan.priceDisplay}) subscription is now active. Confirmation code: ${subscription.confirmationCode}. ${planId === 'premium' ? 'Our team will contact you shortly to begin your end-to-end support journey.' : 'You can now proceed with your admission process.'}`,
            read: false,
            createdAt: new Date().toISOString(),
        });
    }

    res.status(201).json({
        message: `${plan.name} subscription activated successfully!`,
        subscription,
    });
});

// Cancel subscription
router.post('/:subId/cancel', (req, res) => {
    const sub = subscriptions.find(s => s.id === req.params.subId);
    if (!sub) return res.status(404).json({ error: 'Subscription not found' });
    sub.status = 'cancelled';
    res.json({ message: 'Subscription cancelled', subscription: sub });
});

export default router;
