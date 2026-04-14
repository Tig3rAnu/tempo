import { Router } from 'express';

const router = Router();

let payments = [];
let paymentId = 1;

router.get('/', (req, res) => {
    res.json({ total: payments.length, data: payments });
});

router.post('/', (req, res) => {
    const { type, details, amount, currency } = req.body;
    if (!type || !amount) {
        return res.status(400).json({ error: 'Type and amount are required' });
    }
    const payment = {
        id: paymentId++,
        type,
        details: details || '',
        amount: parseFloat(amount),
        currency: currency || 'USD',
        status: 'Processing',
        createdAt: new Date().toISOString()
    };
    payments.push(payment);
    res.status(201).json(payment);
});

export default router;
