# VAT Engine - UK & EU Digital Products

A full-stack VAT calculation engine for digital product sales across the **United Kingdom** and **European Union**.
Built as an internship project demonstrating clean architecture, regulatory reasoning, and modern UI design.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Reference](#api-reference)
- [Architecture Overview](#architecture-overview)
- [VAT Rules Implemented](#vat-rules-implemented)
- [Assumptions](#assumptions)
- [Known Limitations](#known-limitations)
- [Branching & Release Strategy](#branching--release-strategy)
- [License](#license)

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Backend  | Node.js, Express                  |
| Frontend | React 18, Vite 5, Tailwind CSS 3 |
| Testing  | Jest, Supertest                   |

---

## Setup Instructions

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **Git** >= 2.x

### 1. Clone the Repository

```bash
git clone https://github.com/ArulMuruganbhaskaran/vat-engine.git
cd vat-engine
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Run the Application

```bash
# Terminal 1 - Backend API (port 5000)
cd backend
npm start

# Terminal 2 - Frontend Dev Server (port 5173)
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

### 4. Run Tests

```bash
cd backend
npm test
```

Tests include unit tests for the VAT service and integration tests for the API endpoints.

### 5. Build for Production

```bash
cd frontend
npm run build
```

The production build is output to `frontend/dist/`.

---

## API Reference

### `POST /api/vat/calculate`

Calculate VAT for a transaction.

**Request Body:**

```json
{
  "netPrice": 100,
  "countryCode": "DE",
  "vatId": "DE123456789"
}
```

| Field         | Type     | Required | Description                                    |
|---------------|----------|----------|------------------------------------------------|
| `netPrice`    | number   | Yes      | Net price before VAT (must be > 0)             |
| `countryCode` | string   | Yes      | ISO 3166-1 alpha-2 country code (e.g., `GB`)   |
| `vatId`       | string   | No       | VAT identification number for B2B transactions |

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "netPrice": 100,
    "vatRate": 0,
    "vatAmount": 0,
    "totalPrice": 100,
    "vatReason": "EU B2B reverse charge applied. VAT ID DE123456789 verified for Germany. Buyer accounts for VAT."
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "errors": ["netPrice must be a positive number."]
}
```

### `GET /api/health`

Returns service health status.

```json
{ "status": "ok", "service": "vat-engine", "version": "0.1.0" }
```

---

## Architecture Overview

The project follows a **layered architecture** with clear separation of concerns:

```
vat-engine/
|-- backend/
|   +-- src/
|       |-- controllers/   --> HTTP request handlers (parse request, send response)
|       |-- services/      --> Core VAT business logic (calculation rules)
|       |-- validators/    --> Input validation & VAT ID format checks (regex)
|       |-- routes/        --> Express route definitions (URL to controller mapping)
|       |-- tests/         --> Jest unit & integration tests
|       |-- app.js         --> Express app setup (middleware, routes, error handling)
|       +-- server.js      --> Entry point (starts HTTP server)
|
|-- frontend/
|   +-- src/
|       |-- components/    --> React UI components (VatForm, VatResult, ErrorDisplay, DarkModeToggle)
|       |-- hooks/         --> Custom React hooks (useVatCalculation)
|       |-- services/      --> API communication layer (fetch wrapper)
|       |-- App.jsx        --> Main application component
|       +-- main.jsx       --> React entry point
|
|-- ASSUMPTIONS.md         --> Documented assumptions
|-- RELEASE_NOTES.md       --> Version release notes
+-- README.md              --> This file
```

### Data Flow

```
User Input (React Form)
  --> useVatCalculation hook
    --> vatApi.js (HTTP POST to backend)
      --> vatRoutes.js (route matching)
        --> vatValidator.js (input validation)
          --> vatController.js (orchestration)
            --> vatService.js (VAT calculation logic)
              --> Response with VAT breakdown + regulatory reason
```

### Design Decisions

- **Stateless API**: No database - every request is self-contained, making the service horizontally scalable.
- **Regulatory reasoning**: Every response includes a human-readable `vatReason` explaining why a particular rate was applied.
- **Separation of validation and logic**: Validators reject malformed input before it reaches the business logic layer.
- **Dark mode**: UI supports light/dark mode with `localStorage` persistence.

---

## VAT Rules Implemented

| Scenario                | Rate     | Explanation                                      |
|-------------------------|----------|--------------------------------------------------|
| UK B2C                  | 20%      | UK standard VAT rate for digital products        |
| UK B2B (with VAT ID)    | 20%      | Domestic B2B does not qualify for reverse charge  |
| EU B2C                  | 19-25%   | Standard country-specific rate applied            |
| EU B2B (valid VAT ID)   | 0%       | Reverse charge mechanism - buyer accounts for VAT |
| Outside UK/EU           | 0%       | Zero-rated supply                                |

### Supported EU Countries

| Code | Country     | VAT Rate |
|------|-------------|----------|
| DE   | Germany     | 19%      |
| FR   | France      | 20%      |
| IT   | Italy       | 22%      |
| ES   | Spain       | 21%      |
| NL   | Netherlands | 21%      |
| BE   | Belgium     | 21%      |
| AT   | Austria     | 20%      |
| IE   | Ireland     | 23%      |
| PL   | Poland      | 23%      |
| SE   | Sweden      | 25%      |

---

## Assumptions

1. **Seller location**: The seller is a UK-based business.
2. **Product type**: All transactions are for **digital products** (software, e-books, online courses).
3. **Currency**: All prices are in GBP. Currency conversion is out of scope.
4. **UK VAT rate**: Fixed at 20% (current standard rate). Reduced/zero rates for specific categories are not modelled.
5. **UK B2B**: Domestic B2B transactions still attract 20% VAT (reverse charge does not apply within the UK for digital products in this simplified model).
6. **EU B2B reverse charge**: If a valid VAT ID is provided and the country prefix matches, the reverse charge mechanism applies (0% VAT).
7. **EU B2C rates**: Simplified standard VAT rates are used for 10 EU countries. Real-world MOSS/OSS rates may differ.
8. **Outside UK/EU**: Treated as zero-rated supply.
9. **VAT ID validation**: Format-only validation via regex. Real-world would require the EU VIES API.
10. **Country prefix matching**: The first 2 characters of the VAT ID must match the selected country code.
11. **No database**: All calculations are stateless; no transaction history is stored.
12. **No authentication**: The API is open; authentication is out of scope for v0.1.0.

For full details, see [ASSUMPTIONS.md](ASSUMPTIONS.md).

---

## Known Limitations

- **VAT ID validation is format-only** - no integration with the EU VIES API for real-time verification.
- **No transaction history** - calculations are stateless with no database persistence.
- **No user authentication** - the API is open and unauthenticated.
- **Single currency (GBP)** - no multi-currency support or exchange rate conversion.
- **Limited EU coverage** - only 10 EU member states are supported; remaining 17 are treated as "outside EU."
- **No rate-limiting** - the API has no request throttling or abuse protection.
- **No PDF invoice generation** - results are displayed on-screen only.

---

## Branching & Release Strategy

| Branch      | Purpose                            |
|-------------|------------------------------------|
| `main`      | Stable, production-ready code      |
| `feature/*` | Feature development branches       |

- All features are developed on `feature/*` branches and merged via **Pull Requests**.
- Releases are tagged with **semantic versioning** (e.g., `v0.1.0`).
- Release notes are published on the [Releases](https://github.com/ArulMuruganbhaskaran/vat-engine/releases) page.

---

## License

MIT - Arul Murugan S B
#   P A A A I D  
 