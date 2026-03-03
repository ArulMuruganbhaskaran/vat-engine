/**
 * VAT Controller
 * Handles HTTP request/response for VAT calculations.
 */

const { validateVatRequest } = require('../validators/vatValidator');
const { calculateVat } = require('../services/vatService');

/**
 * POST /api/vat/calculate
 * Request body: { netPrice: number, countryCode: string, vatId?: string }
 */
function calculateVatHandler(req, res) {
    try {
        const { netPrice, countryCode, vatId } = req.body;

        // Validate input
        const validation = validateVatRequest(req.body);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors,
            });
        }

        // Normalise VAT ID
        const normalizedVatId = vatId ? vatId.trim().toUpperCase() : null;

        // Calculate VAT
        const result = calculateVat(netPrice, countryCode, normalizedVatId);

        return res.status(200).json({
            success: true,
            data: {
                netPrice: result.netPrice,
                vatAmount: result.vatAmount,
                totalPrice: result.totalPrice,
                vatRate: result.vatRate,
                vatReason: result.vatReason,
            },
        });
    } catch (error) {
        console.error('VAT calculation error:', error);
        return res.status(500).json({
            success: false,
            errors: ['Internal server error. Please try again later.'],
        });
    }
}

module.exports = { calculateVatHandler };
