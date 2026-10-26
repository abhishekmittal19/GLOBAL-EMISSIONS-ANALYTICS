import GlobalStat from '../models/GlobalStat.js';
import CountryEmission from '../models/CountryEmission.js';
import { globalStatsData, countryHistoricalData, keyInsightsData } from '../data/emissionsData.js';
import { getIsMongoConnected } from '../config/db.js';

// Get Overview KPIs for a given year
export const getOverview = async (req, res) => {
  try {
    const year = parseInt(req.query.year, 10) || 2022;

    if (getIsMongoConnected()) {
      const stat = await GlobalStat.findOne({ year });
      if (stat) {
        return res.json({
          year: stat.year,
          totalEmissions: stat.totalEmissions,
          countriesCovered: stat.countriesCovered,
          perCapita: stat.perCapita,
          yoyChangePercent: stat.yoyChangePercent,
          unit: 'Million tonnes',
        });
      }
    }

    // In-memory fallback
    const stat = globalStatsData.find(s => s.year === year) || globalStatsData[globalStatsData.length - 1];
    return res.json({
      year: stat.year,
      totalEmissions: stat.totalEmissions,
      countriesCovered: stat.countriesCovered,
      perCapita: stat.perCapita,
      yoyChangePercent: stat.yoyChangePercent,
      unit: 'Million tonnes',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving overview data', error: error.message });
  }
};

// Get Global Trends
export const getTrends = async (req, res) => {
  try {
    const metric = req.query.metric || 'total'; // 'total' | 'perCapita' | 'cumulative'

    let stats = [];
    if (getIsMongoConnected()) {
      stats = await GlobalStat.find().sort({ year: 1 });
    }
    
    if (!stats || stats.length === 0) {
      stats = [...globalStatsData].sort((a, b) => a.year - b.year);
    }

    const formatted = stats.map(s => {
      let value = s.totalEmissions;
      if (metric === 'perCapita') value = s.perCapita;
      if (metric === 'cumulative') value = s.cumulativeEmissions;

      return {
        year: s.year,
        yearLabel: `${s.year}`,
        value,
        yoy: s.yoyChangePercent,
        perCapita: s.perCapita,
        total: s.totalEmissions,
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving trend data', error: error.message });
  }
};

// Get Top 10 Emitting Countries
export const getTop10 = async (req, res) => {
  try {
    const year = parseInt(req.query.year, 10) || 2022;

    if (getIsMongoConnected()) {
      const records = await CountryEmission.find({ year }).sort({ rank: 1 }).limit(10);
      if (records && records.length > 0) {
        return res.json(records);
      }
    }

    // Fallback
    const list = Object.entries(countryHistoricalData).map(([country, data]) => {
      const stats = data.history[year] || data.history[2022] || { total: 0, perCapita: 0 };
      return {
        country,
        isoCode: data.isoCode,
        flag: data.flag,
        continent: data.continent,
        totalEmissions: stats.total,
        perCapita: stats.perCapita,
      };
    });

    list.sort((a, b) => b.totalEmissions - a.totalEmissions);
    const globalYearStat = globalStatsData.find(g => g.year === year) || { totalEmissions: 36827 };

    const top10 = list.slice(0, 10).map((c, i) => ({
      ...c,
      rank: i + 1,
      shareOfGlobal: parseFloat(((c.totalEmissions / globalYearStat.totalEmissions) * 100).toFixed(1)),
    }));

    res.json(top10);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving top 10 countries', error: error.message });
  }
};

// Get all countries for Map & Table
export const getCountries = async (req, res) => {
  try {
    const year = parseInt(req.query.year, 10) || 2022;

    if (getIsMongoConnected()) {
      const records = await CountryEmission.find({ year }).sort({ rank: 1 });
      if (records && records.length > 0) {
        return res.json(records);
      }
    }

    const list = Object.entries(countryHistoricalData).map(([country, data]) => {
      const stats = data.history[year] || data.history[2022] || { total: 0, perCapita: 0 };
      return {
        country,
        isoCode: data.isoCode,
        flag: data.flag,
        continent: data.continent,
        totalEmissions: stats.total,
        perCapita: stats.perCapita,
      };
    });

    list.sort((a, b) => b.totalEmissions - a.totalEmissions);
    const globalYearStat = globalStatsData.find(g => g.year === year) || { totalEmissions: 36827 };

    const result = list.map((c, i) => ({
      ...c,
      rank: i + 1,
      shareOfGlobal: parseFloat(((c.totalEmissions / globalYearStat.totalEmissions) * 100).toFixed(1)),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
};

// Compare selected countries
export const compareCountries = async (req, res) => {
  try {
    const countriesQuery = req.query.countries || 'China,United States,India,Germany';
    const metric = req.query.metric || 'total'; // 'total' | 'perCapita'
    const countryNames = countriesQuery.split(',').map(c => c.trim()).filter(Boolean);

    const years = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022];
    
    const comparisonSeries = years.map(year => {
      const row = { year, yearLabel: `${year}` };
      countryNames.forEach(country => {
        const countryInfo = countryHistoricalData[country];
        if (countryInfo && countryInfo.history[year]) {
          row[country] = metric === 'perCapita' ? countryInfo.history[year].perCapita : countryInfo.history[year].total;
        } else {
          row[country] = 0;
        }
      });
      return row;
    });

    res.json({
      metric,
      countries: countryNames,
      data: comparisonSeries,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error comparing countries', error: error.message });
  }
};

// Get Key Insights
export const getInsights = async (req, res) => {
  try {
    const year = parseInt(req.query.year, 10) || 2022;
    const globalStat = globalStatsData.find(g => g.year === year) || { totalEmissions: 36827, perCapita: 4.6 };

    const insights = [
      {
        id: 1,
        type: 'globe',
        text: 'China, the United States and India account for the largest share of global CO₂ emissions.',
      },
      {
        id: 2,
        type: 'trend',
        text: 'Global emissions have increased significantly since 1990, with continued growth in recent years.',
      },
      {
        id: 3,
        type: 'users',
        text: `The global average is around ${globalStat.perCapita} tonnes of CO₂ per person (in ${year}).`,
      },
    ];

    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving insights', error: error.message });
  }
};

// Available Years
export const getAvailableYears = (req, res) => {
  const years = [2022, 2020, 2015, 2010, 2005, 2000, 1995, 1990];
  res.json(years);
};
