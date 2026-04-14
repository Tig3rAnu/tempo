import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import universitiesRouter from './routes/universities.js';
import testsRouter from './routes/tests.js';
import materialsRouter from './routes/materials.js';
import paymentsRouter from './routes/payments.js';
import documentsRouter from './routes/documents.js';
import flightsRouter from './routes/flights.js';
import visaRouter from './routes/visa.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import inboxRouter from './routes/inbox.js';
import applicationsRouter from './routes/applications.js';
import transfersRouter from './routes/transfers.js';
import subscriptionsRouter from './routes/subscriptions.js';
import mockTestSubRouter from './routes/mockTestSubscriptions.js';
import newsRouter from './routes/news.js';
import coursesRouter from './routes/courses.js';
import transwireRouter from './routes/transwire.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    console.log(`\x1b[33m[REQ]\x1b[0m ${req.method} ${req.originalUrl}`);
    next();
});

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/universities', universitiesRouter);
app.use('/api/tests', testsRouter);
app.use('/api/materials', materialsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/flights', flightsRouter);
app.use('/api/visa', visaRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/inbox', inboxRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/transfers', transfersRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/mock-test-subscriptions', mockTestSubRouter);
app.use('/api/news', newsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/transwire', transwireRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler
app.use(errorHandler);

// Catch unhandled promise rejections (e.g. failed fetch + JSON.parse)
process.on('unhandledRejection', (reason, promise) => {
    console.error('\x1b[31m[Unhandled Rejection]\x1b[0m');
    console.error('  Promise:', promise);
    console.error('  Reason:', reason?.stack || reason);
});

process.on('uncaughtException', (err) => {
    console.error('\x1b[31m[Uncaught Exception]\x1b[0m', err.stack);
    process.exit(1);
});

// connect to database and start server
(async () => {
    try {
        await connectDB(process.env.MONGO_URI || 'mongodb://root:secret@localhost:27017/shiksha?authSource=admin');
        console.log('[DB] Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`\x1b[36m[Server]\x1b[0m Running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
})();
