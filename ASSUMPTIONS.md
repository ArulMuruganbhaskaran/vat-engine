# Assumptions

The following assumptions have been made for the scope of this internship project:

## Business Context
1. **Seller location**: The seller is assumed to be a UK-based business.
2. **Product type**: All transactions are for **digital products** (e.g., software, e-books, online courses).
3. **Currency**: All prices are in GBP (£). Currency conversion is out of scope.

## VAT Logic
4. **UK VAT rate**: Fixed at **20%** (current standard rate). Reduced/zero rates for specific product categories are not modelled.
5. **UK B2B**: Domestic B2B transactions still attract 20% VAT (reverse charge does not apply within the UK for digital products in this simplified model).
6. **EU B2B reverse charge**: If a valid VAT ID is provided and the country prefix matches, the reverse charge mechanism applies (0% VAT).
7. **EU B2C rates**: Simplified standard VAT rates are used for 10 EU countries. Real-world MOSS/OSS rates may differ for specific product categories.
8. **Outside UK/EU**: Treated as zero-rated supply.

## VAT ID Validation
9. **Format only**: VAT IDs are validated against known format patterns (regex). Real-world validation would require calling the EU VIES API.
10. **Country prefix matching**: The first 2 characters of the VAT ID must match the selected country code.

## Technical
11. **No database**: All calculations are stateless; no transaction history is stored.
12. **No authentication**: The API is open; authentication is out of scope for v0.1.0.
13. **Single currency display**: Results always display in GBP.
14. **Backend port**: Defaults to `5000`.
15. **Frontend port**: Defaults to `5173` (Vite default).
