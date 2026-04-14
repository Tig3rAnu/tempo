import { useState, useEffect, useCallback, useRef } from 'react';

export function useApi(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const urlRef = useRef(url);
    urlRef.current = url;

    const fetchData = useCallback(async (fetchUrl) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(fetchUrl || urlRef.current);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData(url);
    }, [url, fetchData]);

    return { data, loading, error, refetch: fetchData };
}

export async function apiPost(url, body) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return res.json();
}
