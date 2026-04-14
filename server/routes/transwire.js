import { Router } from 'express';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// base URL for Transwire API
const TRANSWIRE_BASE = 'http://13.126.145.20:8080/remit-on-time/api/v1';
const TRANSWIRE_TOKEN = process.env.TRANSWIRE_TOKEN || ''; // set this in your .env

// helper to forward fetch calls to transwire
async function proxyFetch(url, options = {}) {
    // ensure authorization header
    options.headers = options.headers || {};
    if (TRANSWIRE_TOKEN) {
        options.headers.Authorization = `Bearer ${TRANSWIRE_TOKEN}`;
    }

    const res = await fetch(url, options);
    // clone response so we can pipe or parse twice
    return res;
}

// 1. upload document (file) - clients should send form-data with field "file"
router.post('/transaction/document-upload', upload.single('file'), async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'File field is required' });

        const form = new FormData();
        form.append('file', req.file.buffer, req.file.originalname);

        const transRes = await proxyFetch(`${TRANSWIRE_BASE}/transaction/document-upload`, {
            method: 'POST',
            body: form,
            // `form.getHeaders()` only exists in node's FormData implementation when using the
            // `form-data` npm package; for Web/FormData (Node 18+) headers will be set automatically.
        });

        // Transwire returns no body. forward status and headers.
        res.status(transRes.status);
        transRes.headers.forEach((val, key) => res.setHeader(key, val));
        const text = await transRes.text();
        if (text) res.send(text);
        else res.end();
    } catch (err) {
        next(err);
    }
});

// 2. fetch uploaded document by id
router.get('/transaction/document-upload/:id', async (req, res, next) => {
    try {
        const transRes = await proxyFetch(`${TRANSWIRE_BASE}/transaction/document-upload/${encodeURIComponent(req.params.id)}`);
        // pipe body directly (pdf stream)
        res.status(transRes.status);
        transRes.headers.forEach((val, key) => res.setHeader(key, val));
        transRes.body.pipe(res);
    } catch (err) {
        next(err);
    }
});

// 3. verify PAN record (with optional purposeCode query)
router.get('/verify-pan/:pan', async (req, res, next) => {
    try {
        const purpose = req.query.purposeCode ? `?purposeCode=${encodeURIComponent(req.query.purposeCode)}` : '';
        const transRes = await proxyFetch(`${TRANSWIRE_BASE}/verify-pan-record/${encodeURIComponent(req.params.pan)}${purpose}`);
        const data = await transRes.json();
        res.status(transRes.status).json(data);
    } catch (err) {
        next(err);
    }
});

// skeleton endpoint for initiating a transfer through Transwire
router.post('/transfer', async (req, res, next) => {
    try {
        // payload should match Transwire's expected body for money transfer
        const payload = req.body;
        const transRes = await proxyFetch(`${TRANSWIRE_BASE}/transfer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await transRes.json();
        res.status(transRes.status).json(data);
    } catch (err) {
        next(err);
    }
});

export default router;
