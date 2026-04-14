const BASE = '/api/admin';

async function handleResponse(res) {
    const data = await res.json();
    return { ok: res.ok, ...data };
}

export async function getStats() {
    const res = await fetch(`${BASE}/stats`);
    return handleResponse(res);
}

export async function listUsers(role = 'all') {
    const res = await fetch(`${BASE}/users?role=${encodeURIComponent(role)}`);
    return handleResponse(res);
}

export async function saveUser(data) {
    const url = data.id ? `${BASE}/users/${data.id}` : `${BASE}/users`;
    const method = data.id ? 'PUT' : 'POST';
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function deleteUser(id) {
    const res = await fetch(`${BASE}/users/${id}`, { method: 'DELETE' });
    return handleResponse(res);
}

// generic resources
export async function listResource(resource, params = '') {
    const query = params ? `?${params}` : '';
    const res = await fetch(`${BASE}/${resource}${query}`);
    return handleResponse(res);
}

export async function saveResource(resource, data) {
    const url = data.id ? `${BASE}/${resource}/${data.id}` : `${BASE}/${resource}`;
    const method = data.id ? 'PUT' : 'POST';
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function deleteResource(resource, id) {
    const res = await fetch(`${BASE}/${resource}/${id}`, { method: 'DELETE' });
    return handleResponse(res);
}
