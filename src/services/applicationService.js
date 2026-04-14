const BASE = '/api/applications';

export async function listByUser(userId) {
    const res = await fetch(`${BASE}/user/${userId}`);
    return res.json();
}

export async function apply(data) {
    const res = await fetch(`${BASE}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function performAction(appId, action) {
    const res = await fetch(`${BASE}/${appId}/${action}`, { method: 'POST' });
    return res.json();
}
