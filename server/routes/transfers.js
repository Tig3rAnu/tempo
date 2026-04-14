import { Router } from 'express';
import { generateId, users } from '../data/store.js';
import { UNIVERSITIES } from '../data/universities.js';

const router = Router();

let transfers = [];
let transferIdCounter = 5000;

// Get university bank details
router.get('/university-account/:universityId', (req, res) => {
    const uniId = parseInt(req.params.universityId);
    const uni = UNIVERSITIES.find(u => u.id === uniId);
    if (!uni) return res.status(404).json({ error: 'University not found' });
    if (!uni.bankDetails) return res.status(404).json({ error: 'Bank details not available for this university' });
    res.json({
        universityId: uni.id,
        universityName: uni.name,
        country: uni.country,
        countryCode: uni.countryCode,
        tuition: uni.tuition,
        annualExpenditure: uni.annualExpenditure,
        bankDetails: uni.bankDetails
    });
});

// Search universities for transfer
router.get('/search-universities', (req, res) => {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json({ data: [] });
    const lower = q.toLowerCase();
    const results = UNIVERSITIES.filter(u =>
        u.name.toLowerCase().includes(lower) ||
        u.country.toLowerCase().includes(lower)
    ).slice(0, 10).map(u => ({
        id: u.id,
        name: u.name,
        country: u.country,
        countryCode: u.countryCode,
        tuition: u.tuition,
        annualExpenditure: u.annualExpenditure,
        hasBankDetails: !!u.bankDetails
    }));
    res.json({ data: results });
});

// Create a transfer / payment
router.post('/', (req, res) => {
    try {
        const {
            userId, payerName, payerEmail, payerPhone,
            recipientType, // 'university' | 'self_local'
            universityId, universityName,
            selfAccountName, selfBankName, selfAccountNumber, selfIfscCode,
            paymentMethod, // 'card' | 'gpay' | 'phonepe' | 'bank_transfer' | 'upi'
            amount, currency, purpose, notes
        } = req.body;

        if (!amount || !paymentMethod || !recipientType) {
            return res.status(400).json({ error: 'Amount, payment method, and recipient type are required' });
        }
        if (!payerName || !payerEmail) {
            return res.status(400).json({ error: 'Payer name and email are required' });
        }

        let recipientDetails = {};
        if (recipientType === 'university') {
            if (!universityId) return res.status(400).json({ error: 'University selection is required' });
            const uni = UNIVERSITIES.find(u => u.id === parseInt(universityId));
            if (!uni) return res.status(404).json({ error: 'University not found' });
            recipientDetails = {
                universityId: uni.id,
                universityName: uni.name,
                country: uni.country,
                bankName: uni.bankDetails?.bankName || 'N/A',
                accountName: uni.bankDetails?.accountName || 'N/A',
                accountNumber: uni.bankDetails?.accountNumber || 'N/A',
            };
        } else {
            recipientDetails = {
                selfAccountName: selfAccountName || 'N/A',
                selfBankName: selfBankName || 'N/A',
                selfAccountNumber: selfAccountNumber || 'N/A',
                selfIfscCode: selfIfscCode || 'N/A',
            };
        }

        const transfer = {
            id: 'TXN-' + (++transferIdCounter),
            userId: userId || null,
            payerName,
            payerEmail,
            payerPhone: payerPhone || '',
            recipientType,
            ...recipientDetails,
            paymentMethod,
            amount: parseFloat(amount),
            currency: currency || 'USD',
            purpose: purpose || 'Tuition Fee',
            notes: notes || '',
            status: 'processing',
            confirmationCode: 'SHK-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase(),
            createdAt: new Date().toISOString(),
            estimatedCompletion: paymentMethod === 'bank_transfer' ? '2-3 business days' : 'Instant',
        };

        transfers.push(transfer);
        console.log({ transfer, transfers });
        // Simulate processing -> completed after short delay concept
        setTimeout(() => {
            const t = transfers.find(tr => tr.id === transfer.id);
            if (t) t.status = 'completed';
        }, 3000);

        res.status(201).json({
            message: 'Transfer initiated successfully!',
            transfer
        });
    } catch (e) { console.error('ERROR:', e) }
});

// Get transfers for a user
router.get('/history', (req, res) => {
    const { email, userId } = req.query;
    let results = [...transfers];
    if (email) results = results.filter(t => t.payerEmail === email);
    if (userId) results = results.filter(t => t.userId === userId);
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ total: results.length, data: results });
});

// Get single transfer
router.get('/:id', (req, res) => {
    const transfer = transfers.find(t => t.id === req.params.id);
    if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
    res.json(transfer);
});

export default router;
