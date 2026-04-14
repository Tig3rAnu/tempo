const BASE = '/api/mock-test-subscriptions';

export async function subscribe(data) {
    const res = await fetch(`${BASE}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function check(userId) {
    const res = await fetch(`${BASE}/check/${userId}`);
    return res.json();
}
