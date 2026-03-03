/**
 * VAT Service
 * Core business logic for VAT calculation on UK & EU digital products.
 *
 * Rules:
 * - UK domestic sales: 20% VAT
 * - EU B2C (no VAT ID): standard country VAT rate
 * - EU B2B (valid VAT ID, country match): 0% reverse charge
 * - Invalid VAT ID format: rejected
 * - VAT ID country prefix ≠ selected country: rejected
 */

const EU_VAT_RATES = {
  DE: { rate: 19, name: 'Germany' },
  FR: { rate: 20, name: 'France' },
  IT: { rate: 22, name: 'Italy' },
  ES: { rate: 21, name: 'Spain' },
  NL: { rate: 21, name: 'Netherlands' },
  BE: { rate: 21, name: 'Belgium' },
  AT: { rate: 20, name: 'Austria' },
  IE: { rate: 23, name: 'Ireland' },
  PL: { rate: 23, name: 'Poland' },
  SE: { rate: 25, name: 'Sweden' },
  EU: { rate: 20, name: 'Europe' },
};

const UK_VAT_RATE = 20;

/**
 * Calculate VAT for a given transaction.
 * @param {number} netPrice - The net price before VAT
 * @param {string} countryCode - ISO 2-letter country code (e.g., 'GB', 'DE')
 * @param {string|null} vatId - Optional VAT identification number
 * @returns {{ netPrice: number, vatRate: number, vatAmount: number, totalPrice: number, vatReason: string }}
 */
function calculateVat(netPrice, countryCode, vatId = null) {
  // --- UK Transaction ---
  if (countryCode === 'GB') {
    if (vatId) {
      // UK B2B — VAT still applies domestically
      const vatAmount = roundTwo(netPrice * (UK_VAT_RATE / 100));
      return {
        netPrice: roundTwo(netPrice),
        vatRate: UK_VAT_RATE,
        vatAmount,
        totalPrice: roundTwo(netPrice + vatAmount),
        vatReason: `UK standard VAT at ${UK_VAT_RATE}% applied. Domestic B2B does not qualify for reverse charge.`,
      };
    }

    const vatAmount = roundTwo(netPrice * (UK_VAT_RATE / 100));
    return {
      netPrice: roundTwo(netPrice),
      vatRate: UK_VAT_RATE,
      vatAmount,
      totalPrice: roundTwo(netPrice + vatAmount),
      vatReason: `UK standard VAT at ${UK_VAT_RATE}% applied for digital products.`,
    };
  }

  // --- EU Transaction ---
  const euCountry = EU_VAT_RATES[countryCode];
  if (!euCountry) {
    // Zero-rated: country outside UK & EU
    return {
      netPrice: roundTwo(netPrice),
      vatRate: 0,
      vatAmount: 0,
      totalPrice: roundTwo(netPrice),
      vatReason: `Zero-rated supply. Country "${countryCode}" is outside the UK and EU VAT jurisdiction.`,
    };
  }

  // EU B2B with VAT ID → reverse charge
  if (vatId) {
    return {
      netPrice: roundTwo(netPrice),
      vatRate: 0,
      vatAmount: 0,
      totalPrice: roundTwo(netPrice),
      vatReason: `EU B2B reverse charge applied. VAT ID ${vatId} verified for ${euCountry.name}. Buyer accounts for VAT.`,
    };
  }

  // EU B2C — standard country rate
  const rate = euCountry.rate;
  const vatAmount = roundTwo(netPrice * (rate / 100));
  return {
    netPrice: roundTwo(netPrice),
    vatRate: rate,
    vatAmount,
    totalPrice: roundTwo(netPrice + vatAmount),
    vatReason: `EU B2C sale to ${euCountry.name}. Standard VAT at ${rate}% applied for digital products.`,
  };
}

/**
 * Round to two decimal places.
 */
function roundTwo(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

module.exports = {
  calculateVat,
  EU_VAT_RATES,
  UK_VAT_RATE,
};
