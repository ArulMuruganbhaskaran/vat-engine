/**
 * VAT API Service
 * Handles communication with the backend VAT Engine API.
 */

const API_BASE = '/api';

/**
 * Calculate VAT via the backend API.
 * @param {{ netPrice: number, countryCode: string, vatId?: string }} payload
 * @returns {Promise<{ success: boolean, data?: object, errors?: string[] }>}
 */
export async function calculateVat(payload) {
    const response = await fetch(`${API_BASE}/vat/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errors?.[0] || 'Something went wrong.');
    }

    return json;
}
