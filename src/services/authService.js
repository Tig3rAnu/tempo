const BASE = '/api/auth';

async function handleResponse(res) {
    const data = await res.json();
    return { ok: res.ok, ...data };
}

export async function register(data) {
    const res = await fetch(BASE + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return handleResponse(res);
}

export async function login(credentials) {
    const res = await fetch(BASE + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return handleResponse(res);
}

export async function adminLogin(credentials) {
    const res = await fetch(BASE + '/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return handleResponse(res);
}

export async function verifyEmail(email, code) {
    const res = await fetch(BASE + '/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
    });
    return handleResponse(res);
}

export async function verifyPhone(email, code) {
    const res = await fetch(BASE + '/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
    });
    return handleResponse(res);
}

export async function uploadDocuments(email, documents) {
    const res = await fetch(BASE + '/upload-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, documents })
    });
    return handleResponse(res);
}

export async function resendCode(email) {
    const res = await fetch(BASE + '/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return handleResponse(res);
}
