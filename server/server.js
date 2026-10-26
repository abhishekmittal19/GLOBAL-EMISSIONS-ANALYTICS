import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getIsMongoConnected } from './src/config/db.js';
import emissionsRoutes from './src/routes/emissionsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', emissionsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'TerraScope Global Emissions Analytics API',
    mongoConnected: getIsMongoConnected(),
    timestamp: new Date().toISOString(),
  });
});

// Root ping
app.get('/', (req, res) => {
  res.send('TerraScope API is running.');
});

// Start DB and Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[TerraScope Server] Listening on http://localhost:${PORT}`);
  });
};

startServer();
