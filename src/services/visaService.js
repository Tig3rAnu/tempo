const BASE = '/api/visa';

export async function getSteps() {
    const res = await fetch(`${BASE}/steps`);
    return res.json();
}

export async function getCountries() {
    const res = await fetch(`${BASE}/countries`);
    return res.json();
}
