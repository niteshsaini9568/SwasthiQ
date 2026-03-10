import { useState, useEffect } from 'react';

export const useFetch = (fetcher, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await fetcher();
                setData(result);
            } catch (err) {
                setError(err?.response?.data?.detail || err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
};

export const useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const execute = async () => {
        setStatus('pending');
        setData(null);
        setError(null);
        try {
            const response = await asyncFunction();
            setData(response);
            setStatus('success');
            return response;
        } catch (error) {
            setError(error?.response?.data?.detail || error.message);
            setStatus('error');
            throw error;
        }
    };

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, []);

    return { execute, status, data, error };
};
