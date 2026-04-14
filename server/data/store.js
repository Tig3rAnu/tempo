// The memory store is retained for a few ephemeral utilities such as
// verification codes.  Most of the application now uses MongoDB with
// Mongoose models instead of the arrays below.

// Map used during registration flow to hold temporary codes.  The
// auth controller still imports this; can be replaced with a collection
// if persistence is required.
export const verificationCodes = new Map();

// helper that was used previously but is no longer required with Mongo
// _id values.  We keep it temporarily for legacy code paths.
let idCounter = 100;
export function generateId() {
    return 'id-' + (++idCounter) + '-' + Date.now().toString(36);
}

// legacy helpers (not exported/imported anywhere else)
export function findUser(email) {
    // will be removed once all routes use User model
    return null;
}

// previously exported arrays are no longer used
export const users = [];
export const applications = [];
export const inboxMessages = [];
