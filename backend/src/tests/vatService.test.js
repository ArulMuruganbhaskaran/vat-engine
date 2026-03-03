/**
 * Unit Tests – VAT Service
 */

const { calculateVat } = require('../services/vatService');

describe('VAT Service – calculateVat()', () => {

    // ─── UK Transactions ───

    test('UK B2C: applies 20% VAT', () => {
        const result = calculateVat(100, 'GB');
        expect(result.vatRate).toBe(20);
        expect(result.vatAmount).toBe(20);
        expect(result.totalPrice).toBe(120);
        expect(result.vatReason).toContain('UK standard VAT at 20%');
    });

    test('UK B2B: still applies 20% VAT (domestic)', () => {
        const result = calculateVat(100, 'GB', 'GB123456789');
        expect(result.vatRate).toBe(20);
        expect(result.vatAmount).toBe(20);
        expect(result.totalPrice).toBe(120);
        expect(result.vatReason).toContain('does not qualify for reverse charge');
    });

    test('UK: correct rounding on fractional price', () => {
        const result = calculateVat(99.99, 'GB');
        expect(result.vatAmount).toBe(20);
        expect(result.totalPrice).toBe(119.99);
    });

    // ─── EU B2B Reverse Charge ───

    test('EU B2B Germany: 0% reverse charge with valid VAT ID', () => {
        const result = calculateVat(200, 'DE', 'DE123456789');
        expect(result.vatRate).toBe(0);
        expect(result.vatAmount).toBe(0);
        expect(result.totalPrice).toBe(200);
        expect(result.vatReason).toContain('reverse charge');
        expect(result.vatReason).toContain('Germany');
    });

    test('EU B2B France: 0% reverse charge', () => {
        const result = calculateVat(150, 'FR', 'FRXX123456789');
        expect(result.vatRate).toBe(0);
        expect(result.vatAmount).toBe(0);
        expect(result.totalPrice).toBe(150);
        expect(result.vatReason).toContain('reverse charge');
    });

    // ─── EU B2C Standard Rate ───

    test('EU B2C Germany: 19% VAT', () => {
        const result = calculateVat(100, 'DE');
        expect(result.vatRate).toBe(19);
        expect(result.vatAmount).toBe(19);
        expect(result.totalPrice).toBe(119);
        expect(result.vatReason).toContain('Germany');
        expect(result.vatReason).toContain('19%');
    });

    test('EU B2C Italy: 22% VAT', () => {
        const result = calculateVat(100, 'IT');
        expect(result.vatRate).toBe(22);
        expect(result.vatAmount).toBe(22);
        expect(result.totalPrice).toBe(122);
    });

    test('EU B2C Sweden: 25% VAT', () => {
        const result = calculateVat(100, 'SE');
        expect(result.vatRate).toBe(25);
        expect(result.vatAmount).toBe(25);
        expect(result.totalPrice).toBe(125);
    });

    // ─── Zero-Rated (Outside UK & EU) ───

    test('Outside UK/EU: zero-rated', () => {
        const result = calculateVat(100, 'US');
        expect(result.vatRate).toBe(0);
        expect(result.vatAmount).toBe(0);
        expect(result.totalPrice).toBe(100);
        expect(result.vatReason).toContain('Zero-rated');
    });

    // ─── Edge Cases ───

    test('Small net price: correct calculation', () => {
        const result = calculateVat(0.01, 'GB');
        expect(result.vatAmount).toBeCloseTo(0, 2);
        expect(result.totalPrice).toBeCloseTo(0.01, 2);
    });

    test('Large net price: correct calculation', () => {
        const result = calculateVat(999999.99, 'DE');
        expect(result.vatRate).toBe(19);
        expect(result.vatAmount).toBe(190000);
        expect(result.totalPrice).toBe(1189999.99);
    });
});
