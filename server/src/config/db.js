import mongoose from 'mongoose';
import GlobalStat from '../models/GlobalStat.js';
import CountryEmission from '../models/CountryEmission.js';
import { globalStatsData, countryHistoricalData } from '../data/emissionsData.js';

let isMongoConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/terrascope';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    
    // Seed database if empty
    await seedDatabaseIfEmpty();
  } catch (error) {
    isMongoConnected = false;
    console.log(`[MERN Server] MongoDB not reachable at ${mongoURI} (${error.message}).`);
    console.log(`[MERN Server] Operating in high-performance Verified In-Memory Repository mode.`);
  }
};

export const getIsMongoConnected = () => isMongoConnected;

async function seedDatabaseIfEmpty() {
  try {
    const statCount = await GlobalStat.countDocuments();
    if (statCount === 0) {
      console.log('[MongoDB] Seeding GlobalStat collection...');
      await GlobalStat.insertMany(globalStatsData);
    }

    const countryCount = await CountryEmission.countDocuments();
    if (countryCount === 0) {
      console.log('[MongoDB] Seeding CountryEmission collection...');
      const records = [];
      const years = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022];
      
      for (const year of years) {
        // Collect all countries for this year
        const list = Object.entries(countryHistoricalData).map(([country, data]) => {
          const stats = data.history[year] || { total: 0, perCapita: 0 };
          return {
            country,
            isoCode: data.isoCode,
            flag: data.flag,
            continent: data.continent,
            year,
            totalEmissions: stats.total,
            perCapita: stats.perCapita,
          };
        });

        // Sort by totalEmissions descending
        list.sort((a, b) => b.totalEmissions - a.totalEmissions);
        const globalYearStat = globalStatsData.find(g => g.year === year) || { totalEmissions: 36827 };
        
        list.forEach((item, index) => {
          records.push({
            ...item,
            rank: index + 1,
            shareOfGlobal: parseFloat(((item.totalEmissions / globalYearStat.totalEmissions) * 100).toFixed(1)),
          });
        });
      }

      await CountryEmission.insertMany(records);
      console.log(`[MongoDB] Successfully seeded ${records.length} country emission records.`);
    }
  } catch (err) {
    console.error('[MongoDB] Error seeding database:', err.message);
  }
}
