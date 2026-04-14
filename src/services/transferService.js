import * as transwire from './transwireService';

const BASE = '/api/transfers';

export async function searchUniversities(q) {
    const res = await fetch(`${BASE}/search-universities?q=${encodeURIComponent(q)}`);
    return res.json();
}

export async function getUniversityAccount(id) {
    const res = await fetch(`${BASE}/university-account/${id}`);
    return res.json();
}

export async function createTransfer(data) {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function historyByEmail(email) {
    const res = await fetch(`${BASE}/history?email=${encodeURIComponent(email)}`);
    return res.json();
}

// convenience helpers that use Transwire API instead of internal stub
export async function createTranswireTransfer(data) {
    return transwire.initiateTransfer(data);
}

export function uploadTransferDocument(file) {
    return transwire.uploadTransactionDocument(file);
}

export function getTransferDocument(id) {
    return transwire.getTransactionDocument(id);
}

export async function verifyPan(pan, purposeCode) {
    return transwire.verifyPanRecord(pan, purposeCode);
}
