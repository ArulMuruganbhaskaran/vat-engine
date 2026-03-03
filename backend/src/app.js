/**
 * Express Application Setup
 * Configures middleware and routes.
 */

const express = require('express');
const cors = require('cors');
const vatRoutes = require('./routes/vatRoutes');

const app = express();

// ---------- Middleware ----------
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
}));
app.use(express.json());

// ---------- Routes ----------
app.use('/api/vat', vatRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'vat-engine', version: '0.1.0' });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ success: false, errors: ['Route not found.'] });
});

module.exports = app;
