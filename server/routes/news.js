import { Router } from 'express';
import { NEWS_UPDATES } from '../data/news.js';

const router = Router();

router.get('/', (req, res) => {
    const { category, search } = req.query;
    let results = [...NEWS_UPDATES];

    if (category && category !== 'All') {
        results = results.filter(n => n.category === category);
    }

    if (search) {
        const q = search.toLowerCase();
        results = results.filter(n =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q) ||
            n.subcategory.toLowerCase().includes(q)
        );
    }

    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ total: results.length, data: results });
});

export default router;
