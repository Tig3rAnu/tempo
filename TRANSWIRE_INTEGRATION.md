# Transwire API Integration

This repository now includes support for the Transwire "Agent Apis" described in the Postman documentation you provided. The integration covers:

* **Money transfers** (payments to universities, self accounts, flight fees, etc.)
* **Fees payments** across the application (used by `PaymentsPage.jsx`)
* **Flight ticket booking payments** (calls Transwire after a flight booking is created)

## Server side

1. Added new route `server/routes/transwire.js` that proxies calls to the Transwire backend (`http://13.126.145.20:8080/remit-on-time/api/v1`).
   - `POST /api/transwire/transaction/document-upload` – forward form‑data file uploads
   - `GET  /api/transwire/transaction/document-upload/:id` – fetch raw PDF
   - `GET  /api/transwire/verify-pan/:pan` – with optional `purposeCode` query
   - `POST /api/transwire/transfer` – generic transfer endpoint (payload depends on Transwire spec)

2. Install dependencies for file handling:
   ```bash
   npm install multer
   ```

3. Set an environment variable with your bearer token before starting the server:
   ```bash
   export TRANSWIRE_TOKEN="$YOUR_TOKEN"  # or use .env with dotenv
   npm run dev
   ```

4. The new router is mounted in `server/index.js` under `/api/transwire`.

## Client side

* Added `src/services/transwireService.js` – wrapper around the proxy endpoints.
* Extended `src/services/transferService.js` to re‑export Transwire helpers (`createTranswireTransfer`, `uploadTransferDocument`, etc.).
* `PaymentsPage.jsx` now automatically uses `createTranswireTransfer` when available; it still falls back to the in‑memory stub if not.
* `FlightsPage.jsx` calls `createTranswireTransfer` after a successful booking so that flight fees are paid via Transwire.

### Example usage

```js
import { uploadTransactionDocument, verifyPanRecord } from '../services/transwireService';

// upload file
const response = await uploadTransactionDocument(fileInput.files[0]);

// verify PAN
const panInfo = await verifyPanRecord('ACDQS A123B', 'STUDENT_RENT_PAYMENT');
```

## Notes

* If you need additional Transwire endpoints (currency lookup, charges, etc.), create similar proxy methods in `transwire.js` and export them in the service file.
* Front‑end components can now call `createTranswireTransfer({ amount, currency, payerName, payerEmail, purpose, paymentMethod, ... })` to perform real transfers.
* Keep the bearer token secret – do not push it to version control.

This integration gives the application a path to handle real-world money transfer, fee payment and flight booking flows using the Transwire API.
