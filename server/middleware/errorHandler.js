export function errorHandler(err, req, res, next) {
    // Full stack trace with file + line info
    console.error('\x1b[31m[ERROR]\x1b[0m', new Date().toISOString());
    console.error(`  Route:   ${req.method} ${req.originalUrl}`);
    console.error(`  Message: ${err.message}`);
    console.error(`  Stack:\n${err.stack}`);

    // Log request body/params to help trace bad input (e.g. malformed JSON)
    if (req.body && Object.keys(req.body).length) {
        console.error(`  Body:    ${JSON.stringify(req.body)}`);
    }
    if (Object.keys(req.params).length) {
        console.error(`  Params:  ${JSON.stringify(req.params)}`);
    }
    if (Object.keys(req.query).length) {
        console.error(`  Query:   ${JSON.stringify(req.query)}`);
    }

    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
}
