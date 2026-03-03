# Release Notes

## v0.1.0 — Initial Release

**Date**: 2026-03-01

### Features

#### Backend
- ✅ VAT calculation engine with UK (20%) and EU country-specific rates
- ✅ EU B2B reverse charge mechanism (0% VAT with valid VAT ID)
- ✅ VAT ID format validation for GB + 10 EU countries
- ✅ Country mismatch detection (VAT ID prefix vs selected country)
- ✅ Zero-rated supply for non-UK/EU countries
- ✅ Detailed regulatory reasoning in every response
- ✅ RESTful API: `POST /api/vat/calculate`
- ✅ Health check endpoint: `GET /api/health`
- ✅ Comprehensive Jest test suite (unit + integration)

#### Frontend
- ✅ Modern fintech-style UI built with React 18 + Vite + Tailwind CSS
- ✅ Net price input with validation
- ✅ Country selector (UK + 10 EU countries) with flag emojis
- ✅ Optional VAT ID input for B2B reverse charge
- ✅ Animated VAT breakdown card with regulatory reason
- ✅ Error display with clear messaging
- ✅ Loading states with spinner animation
- ✅ Dark mode toggle with localStorage persistence
- ✅ Glassmorphism card design with gradient accents
- ✅ Fully responsive (mobile, tablet, desktop)

#### Documentation
- ✅ README with setup instructions and API docs
- ✅ Assumptions document
- ✅ Release notes

### Known Limitations
- VAT ID validation is format-only (no VIES API integration)
- No transaction history or database persistence
- No user authentication
- Prices displayed in GBP only

### Next Steps (v0.2.0 candidates)
- VIES API integration for real-time VAT ID verification
- Transaction history with database storage
- PDF invoice generation
- Multi-currency support
- Rate-limiting and API key authentication
