const BASE = '/api/flights';

async function handleResponse(res) {
    const data = await res.json();
    return { ok: res.ok, ...data };
}

export async function getDestinations() {
    const res = await fetch(`${BASE}/destinations`);
    return handleResponse(res);
}

export async function getPopular() {
    const res = await fetch(`${BASE}/popular`);
    return handleResponse(res);
}

export async function getCountryRoutes(country) {
    const res = await fetch(`${BASE}/country/${encodeURIComponent(country)}`);
    return handleResponse(res);
}

export async function search(from, to, date, passengers) {
    const res = await fetch(`${BASE}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, date, passengers })
    });
    return handleResponse(res);
}

export async function getBookings(email) {
    const res = await fetch(`${BASE}/bookings?email=${encodeURIComponent(email)}`);
    return handleResponse(res);
}

export async function cancelBooking(bookingId) {
    const res = await fetch(`${BASE}/bookings/${bookingId}/cancel`, { method: 'POST' });
    return handleResponse(res);
}

export async function book(data) {
    const res = await fetch(`${BASE}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}
