const BASE = '/api/tests';

export async function list(category = '') {
    const url = category ? `${BASE}?category=${encodeURIComponent(category)}` : BASE;
    const res = await fetch(url);
    return res.json();
}

export async function create(data) {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function update(id, data) {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function remove(id) {
    const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
    return res.json();
}
