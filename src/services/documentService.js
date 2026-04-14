const BASE = '/api/documents';

export async function list() {
    const res = await fetch(BASE);
    return res.json();
}

export async function upload(formData) {
    const res = await fetch(BASE, {
        method: 'POST',
        body: formData
    });
    return res.json();
}
