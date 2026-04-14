const BASE = '/api/transwire';

export async function uploadTransactionDocument(file) {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${BASE}/transaction/document-upload`, {
        method: 'POST',
        body: form,
    });
    return res; // caller can inspect status or headers
}

export async function getTransactionDocument(id) {
    const res = await fetch(`${BASE}/transaction/document-upload/${encodeURIComponent(id)}`);
    // returns a Blob (pdf data)
    const blob = await res.blob();
    return blob;
}

export async function verifyPanRecord(pan, purposeCode) {
    const params = new URLSearchParams();
    if (purposeCode) params.set('purposeCode', purposeCode);
    const res = await fetch(`${BASE}/verify-pan/${encodeURIComponent(pan)}?${params.toString()}`);
    return res.json();
}

// generic transfer wrapper
export async function initiateTransfer(payload) {
    const res = await fetch(`${BASE}/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return res.json();
}
