import { Router } from 'express';
import { MOCK_TESTS } from '../data/tests.js';

const router = Router();
// In-memory store initialized with seed data
let tests = [...MOCK_TESTS];
let nextId = 2000;

router.get('/', (req, res) => {
    const { category } = req.query;
    let results = [...tests];
    if (category && category !== 'All') {
        results = results.filter(t => t.category === category);
    }
    const categories = [...new Set(tests.map(t => t.category))];
    res.json({ total: results.length, data: results, categories });
});

router.get('/:id', (req, res) => {
    const test = tests.find(t => t.id === parseInt(req.params.id));
    if (!test) return res.status(404).json({ error: 'Test not found' });
    res.json(test);
});

// Create Test
router.post('/', (req, res) => {
    const { name, category, questions, duration, difficulty, isSample, scheduledFor } = req.body;
    if (!name || !category) return res.status(400).json({ error: 'Name and Category are required' });

    const newTest = {
        id: nextId++,
        name,
        category,
        questions: parseInt(questions) || 0,
        duration: duration || '60 min',
        difficulty: difficulty || 'Medium',
        completed: false,
        isSample: isSample || false,
        scheduledFor: scheduledFor || null,
        createdAt: new Date().toISOString()
    };
    tests.push(newTest);
    res.status(201).json(newTest);
});

// Update Test
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = tests.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Test not found' });

    tests[idx] = {
        ...tests[idx],
        ...req.body,
        id // Prevent ID change
    };
    res.json(tests[idx]);
});

// Delete Test
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initLen = tests.length;
    tests = tests.filter(t => t.id !== id);
    if (tests.length === initLen) return res.status(404).json({ error: 'Test not found' });
    res.json({ message: 'Test deleted successfully' });
});

export default router;
