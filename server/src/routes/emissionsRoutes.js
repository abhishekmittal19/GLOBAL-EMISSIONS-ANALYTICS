import express from 'express';
import {
  getOverview,
  getTrends,
  getTop10,
  getCountries,
  compareCountries,
  getInsights,
  getAvailableYears,
} from '../controllers/emissionsController.js';

const router = express.Router();

router.get('/overview', getOverview);
router.get('/trends', getTrends);
router.get('/top10', getTop10);
router.get('/countries', getCountries);
router.get('/compare', compareCountries);
router.get('/insights', getInsights);
router.get('/years', getAvailableYears);

export default router;
