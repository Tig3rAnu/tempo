const BASE = '/api/universities';

async function handleResponse(res) {
    const data = await res.json();
    return { ok: res.ok, ...data };
}

export async function list(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE}?${query}`);
    return handleResponse(res);
}

export async function get(id) {
    const res = await fetch(`${BASE}/${id}`);
    return handleResponse(res);
}

export async function create(data) {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return handleResponse(res);
}

export async function update(id, data) {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return handleResponse(res);
}

export async function remove(id) {
    const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
    return handleResponse(res);
}
