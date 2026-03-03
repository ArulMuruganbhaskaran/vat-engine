/**
 * Integration Tests – VAT API
 */

const request = require('supertest');
const app = require('../app');

describe('POST /api/vat/calculate', () => {

    // ─── Successful Calculations ───

    test('UK B2C: returns 20% VAT', async () => {
        const res = await request(app)
            .post('/api/vat/calculate')
            .send({ netPrice: 100, countryCode: 'GB' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.vatAmount).toBe(20);
        expect(res.body.data.totalPrice).toBe(120);
        expect(res.body.data.vatRate).toBe(20);
    });

    test('EU B2B reverse charge: returns 0% VAT', async () => {
        const res = await request(app)
            .post('/api/vat/calculate')
            .send({ netPrice: 200, countryCode: 'DE', vatId: 'DE123456789' });

        expect(res.status).toBe(200);
        expect(res.body.data.vatAmount).toBe(0);
        expect(res.body.data.totalPrice).toBe(200);
        expect(res.body.data.vatReason).toContain('reverse charge');
    });

    test('EU B2C: returns standard country VAT', async () => {
        const res = await request(app)
            .post('/api/vat/calculate')
            .send({ netPrice: 100, countryCode: 'FR' });

        expect(res.status).toBe(200);
        expect(res.body.data.vatRate).toBe(20);
        expect(res.body.data.vatAmount).toBe(20);
    });

    // ─── Validation Errors ───

    test('Missing net price: returns 400', async () => {
        const res = await request(app)
            .post('/api/vat/calculate')
            .send({ countryCode: 'GB' });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors).toContain('Net price is required.');
    });

    test('Negative net price: returns 400', async () => {
        const res = await request(app)
            .post('/api/vat/calculate')
            .send({ netPrice: -10, countryCode: 'GB' });

        expect(res.status).toBe(400);
        expect(res.body.errors).toContain('Net price must be greater than zero.');
    });

    test('Missing country code: returns 400', async () => {
        const res = await request(app)
            .post('/api/vat/calculate')
            .send({ netPrice: 100 });

        expect(res.status).toBe(400);
        expect(res.body.errors).toContain('Country code is required.');
    });

    test('Invalid VAT ID format: returns 400', async () => {
        const res = await request(app)
            .post('/api/vat/calculate')
            .send({ netPrice: 100, countryCode: 'DE', vatId: 'DE123' });

        expect(res.status).toBe(400);
        expect(res.body.errors[0]).toContain('Invalid VAT ID format');
    });

    test('Country mismatch: returns 400', async () => {
        const res = await request(app)
            .post('/api/vat/calculate')
            .send({ netPrice: 100, countryCode: 'FR', vatId: 'DE123456789' });

        expect(res.status).toBe(400);
        expect(res.body.errors[0]).toContain('mismatch');
    });

    // ─── Health Check ───

    test('GET /api/health: returns ok', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    // ─── 404 ───

    test('Unknown route: returns 404', async () => {
        const res = await request(app).get('/api/unknown');
        expect(res.status).toBe(404);
    });
});
