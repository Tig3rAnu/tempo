import { Router } from 'express';
import { STUDY_MATERIALS } from '../data/materials.js';

const router = Router();
// In-memory store initialized with seed data
let materials = [...STUDY_MATERIALS];
let nextId = 6000;

router.get('/', (req, res) => {
    const { category } = req.query;
    let results = [...materials];
    if (category && category !== 'All') {
        results = results.filter(m => m.category === category);
    }
    const categories = [...new Set(materials.map(m => m.category))];
    res.json({ total: results.length, data: results, categories });
});

router.get('/:id', (req, res) => {
    const mat = materials.find(m => m.id === parseInt(req.params.id));
    if (!mat) return res.status(404).json({ error: 'Material not found' });
    res.json(mat);
});

// Create Material
router.post('/', (req, res) => {
    const { title, type, category, subject, size, videoUrl } = req.body;
    if (!title || !category) return res.status(400).json({ error: 'Title and Category are required' });

    const newMat = {
        id: nextId++,
        title,
        type: type || 'PDF',
        category,
        subject: subject || null,
        size: size || '5 MB',
        downloads: 0,
        videoUrl: videoUrl || null,
        createdAt: new Date().toISOString()
    };
    materials.push(newMat);
    res.status(201).json(newMat);
});

// Update Material
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = materials.findIndex(m => m.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Material not found' });

    materials[idx] = {
        ...materials[idx],
        ...req.body,
        id // Prevent ID change
    };
    res.json(materials[idx]);
});

// Delete Material
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initLen = materials.length;
    materials = materials.filter(m => m.id !== id);
    if (materials.length === initLen) return res.status(404).json({ error: 'Material not found' });
    res.json({ message: 'Material deleted successfully' });
});

export default router;
