const BASE = '/api/subscriptions';

export async function subscribe(data) {
    const res = await fetch(`${BASE}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function listByUser(userId) {
    const res = await fetch(`${BASE}/user/${userId}`);
    return res.json();
}
