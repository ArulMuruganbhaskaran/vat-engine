import { useState, useCallback } from 'react';
import { calculateVat } from '../services/vatApi';

/**
 * Custom hook for managing VAT calculation state.
 */
export function useVatCalculation() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculate = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const payload = {
                netPrice: parseFloat(formData.netPrice),
                countryCode: formData.countryCode,
            };

            if (formData.vatId && formData.vatId.trim()) {
                payload.vatId = formData.vatId.trim();
            }

            const response = await calculateVat(payload);
            setResult(response.data);
        } catch (err) {
            setError(err.message || 'Failed to calculate VAT. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setResult(null);
        setError(null);
        setLoading(false);
    }, []);

    return { result, error, loading, calculate, reset };
}
