const BASE = '/api/news';

export async function list(query = '') {
    const url = query ? `${BASE}${query}` : BASE;
    const res = await fetch(url);
    return res.json();
}
