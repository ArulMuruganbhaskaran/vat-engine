/**
 * VAT Routes
 * Defines API endpoints for VAT operations.
 */

const express = require('express');
const router = express.Router();
const { calculateVatHandler } = require('../controllers/vatController');

// POST /api/vat/calculate
router.post('/calculate', calculateVatHandler);

module.exports = router;
