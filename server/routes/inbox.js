import { Router } from 'express';
import { inboxMessages, generateId } from '../data/store.js';

const router = Router();

// Get inbox for user
router.get('/:userId', (req, res) => {
    const msgs = inboxMessages.filter(m => m.userId === req.params.userId);
    msgs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ total: msgs.length, data: msgs });
});

// Mark as read
router.post('/:msgId/read', (req, res) => {
    const msg = inboxMessages.find(m => m.id === req.params.msgId);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    msg.read = true;
    res.json({ message: 'Marked as read' });
});

// Send message (university -> student/agent)
router.post('/', (req, res) => {
    const { userId, subject, body, type, attachmentType, applicationId } = req.body;
    const msg = {
        id: generateId(),
        userId,
        type: type || 'message',
        subject,
        body,
        attachmentType: attachmentType || null,
        applicationId: applicationId || null,
        read: false,
        createdAt: new Date().toISOString()
    };
    inboxMessages.push(msg);
    res.status(201).json(msg);
});

export default router;
