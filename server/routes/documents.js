import { Router } from 'express';

const router = Router();

const documents = [
    { id: 1, name: 'Passport Copy', status: 'Verified', date: 'Dec 10, 2024' },
    { id: 2, name: 'Academic Transcripts', status: 'Under Review', date: 'Dec 12, 2024' },
    { id: 3, name: 'Statement of Purpose', status: 'Pending', date: 'Dec 14, 2024' },
    { id: 4, name: 'Recommendation Letters', status: 'Not Uploaded', date: '-' },
    { id: 5, name: 'English Score', status: 'Verified', date: 'Dec 8, 2024' },
];

router.get('/', (req, res) => {
    res.json({ total: documents.length, data: documents });
});

router.post('/upload', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Document name required' });
    const doc = {
        id: documents.length + 1,
        name,
        status: 'Pending',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    documents.push(doc);
    res.status(201).json(doc);
});

export default router;
