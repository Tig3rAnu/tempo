const BASE = '/api/inbox';

export async function list(userId) {
    const res = await fetch(`${BASE}/${userId}`);
    return res.json();
}

export async function markRead(msgId) {
    const res = await fetch(`${BASE}/${msgId}/read`, { method: 'POST' });
    return res.json();
}
