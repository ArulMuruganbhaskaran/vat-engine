/**
 * VAT Validator
 * Validates request inputs: net price, country code, and VAT ID format.
 *
 * VAT ID format rules (simplified for internship scope):
 * - GB: GB + 9 or 12 digits
 * - DE: DE + 9 digits
 * - FR: FR + 2 chars + 9 digits
 * - IT: IT + 11 digits
 * - ES: ES + 1 char + 7 digits + 1 char
 * - NL: NL + 9 digits + B + 2 digits
 * - BE: BE + 10 digits
 * - AT: ATU + 8 digits
 * - IE: IE + 7 digits + 1-2 chars
 * - PL: PL + 10 digits
 * - SE: SE + 12 digits
 */

const VAT_ID_PATTERNS = {
    GB: /^GB(\d{9}|\d{12})$/,
    DE: /^DE\d{9}$/,
    FR: /^FR[A-Z0-9]{2}\d{9}$/,
    IT: /^IT\d{11}$/,
    ES: /^ES[A-Z0-9]\d{7}[A-Z0-9]$/,
    NL: /^NL\d{9}B\d{2}$/,
    BE: /^BE\d{10}$/,
    AT: /^ATU\d{8}$/,
    IE: /^IE\d{7}[A-Z]{1,2}$/,
    PL: /^PL\d{10}$/,
    SE: /^SE\d{12}$/,
    EU: /^EU\d{9}$/,
};

const SUPPORTED_COUNTRIES = ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'PL', 'SE', 'EU'];

/**
 * Validate the VAT calculation request.
 * @param {object} body - Request body { netPrice, countryCode, vatId? }
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateVatRequest(body) {
    const errors = [];

    // --- Net Price ---
    const { netPrice, countryCode, vatId } = body || {};

    if (netPrice === undefined || netPrice === null || netPrice === '') {
        errors.push('Net price is required.');
    } else if (typeof netPrice !== 'number' || isNaN(netPrice)) {
        errors.push('Net price must be a valid number.');
    } else if (netPrice <= 0) {
        errors.push('Net price must be greater than zero.');
    }

    // --- Country Code ---
    if (!countryCode) {
        errors.push('Country code is required.');
    } else if (!SUPPORTED_COUNTRIES.includes(countryCode)) {
        errors.push(`Unsupported country code "${countryCode}". Supported: ${SUPPORTED_COUNTRIES.join(', ')}.`);
    }

    // --- VAT ID (optional) ---
    if (vatId) {
        const trimmedVatId = vatId.trim().toUpperCase();

        // Extract the country prefix from the VAT ID (first 2 characters)
        const vatIdPrefix = trimmedVatId.substring(0, 2);

        // Special case: Austrian VAT IDs start with "ATU" (3-char prefix)
        const effectivePrefix = trimmedVatId.startsWith('ATU') ? 'AT' : vatIdPrefix;

        // Check country mismatch
        if (countryCode && effectivePrefix !== countryCode) {
            errors.push(
                `VAT ID country mismatch: VAT ID prefix "${effectivePrefix}" does not match selected country "${countryCode}".`
            );
        } else {
            // Check format validity
            const pattern = VAT_ID_PATTERNS[countryCode];
            if (pattern && !pattern.test(trimmedVatId)) {
                errors.push(
                    `Invalid VAT ID format for ${countryCode}. Please check the VAT number and try again.`
                );
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

module.exports = {
    validateVatRequest,
    VAT_ID_PATTERNS,
    SUPPORTED_COUNTRIES,
};
