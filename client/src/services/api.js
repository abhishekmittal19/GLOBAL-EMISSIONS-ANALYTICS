// Frontend API Client for TerraScope
const API_BASE = '/api';

export const fetchOverview = async (year = 2022) => {
  try {
    const res = await fetch(`${API_BASE}/overview?year=${year}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error (overview), using cached default:', err.message);
    return {
      year,
      totalEmissions: 36827,
      countriesCovered: 196,
      perCapita: 4.6,
      yoyChangePercent: 1.1,
      unit: 'Million tonnes',
    };
  }
};

export const fetchTrends = async (metric = 'total') => {
  try {
    const res = await fetch(`${API_BASE}/trends?metric=${metric}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error (trends), using cached default:', err.message);
    return [
      { year: 1990, yearLabel: '1990', value: 10500, yoy: 1.8, perCapita: 3.1 },
      { year: 1995, yearLabel: '1995', value: 13800, yoy: 1.5, perCapita: 3.3 },
      { year: 2000, yearLabel: '2000', value: 17100, yoy: 2.1, perCapita: 3.6 },
      { year: 2005, yearLabel: '2005', value: 20500, yoy: 2.7, perCapita: 3.9 },
      { year: 2010, yearLabel: '2010', value: 24800, yoy: 3.2, perCapita: 4.2 },
      { year: 2015, yearLabel: '2015', value: 29700, yoy: 0.9, perCapita: 4.4 },
      { year: 2020, yearLabel: '2020', value: 32000, yoy: -4.8, perCapita: 4.3 },
      { year: 2022, yearLabel: '2022', value: 36827, yoy: 1.1, perCapita: 4.6 },
    ];
  }
};

export const fetchTop10 = async (year = 2022) => {
  try {
    const res = await fetch(`${API_BASE}/top10?year=${year}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error (top10), using cached default:', err.message);
    return [
      { rank: 1, country: 'China', isoCode: 'CHN', flag: '🇨🇳', totalEmissions: 11472, shareOfGlobal: 31.1, perCapita: 8.0 },
      { rank: 2, country: 'United States', isoCode: 'USA', flag: '🇺🇸', totalEmissions: 5057, shareOfGlobal: 13.7, perCapita: 14.9 },
      { rank: 3, country: 'India', isoCode: 'IND', flag: '🇮🇳', totalEmissions: 2909, shareOfGlobal: 7.9, perCapita: 2.0 },
      { rank: 4, country: 'Russia', isoCode: 'RUS', flag: '🇷🇺', totalEmissions: 1761, shareOfGlobal: 4.8, perCapita: 12.1 },
      { rank: 5, country: 'Japan', isoCode: 'JPN', flag: '🇯🇵', totalEmissions: 1107, shareOfGlobal: 3.0, perCapita: 8.9 },
      { rank: 6, country: 'Iran', isoCode: 'IRN', flag: '🇮🇷', totalEmissions: 736, shareOfGlobal: 2.0, perCapita: 8.5 },
      { rank: 7, country: 'Germany', isoCode: 'DEU', flag: '🇩🇪', totalEmissions: 674, shareOfGlobal: 1.8, perCapita: 8.1 },
      { rank: 8, country: 'Saudi Arabia', isoCode: 'SAU', flag: '🇸🇦', totalEmissions: 626, shareOfGlobal: 1.7, perCapita: 17.5 },
      { rank: 9, country: 'Indonesia', isoCode: 'IDN', flag: '🇮🇩', totalEmissions: 618, shareOfGlobal: 1.7, perCapita: 2.2 },
      { rank: 10, country: 'South Korea', isoCode: 'KOR', flag: '🇰🇷', totalEmissions: 611, shareOfGlobal: 1.7, perCapita: 11.8 },
    ];
  }
};

export const fetchCountries = async (year = 2022) => {
  try {
    const res = await fetch(`${API_BASE}/countries?year=${year}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error (countries), using fallback:', err.message);
    return [];
  }
};

export const fetchComparison = async (countries = ['China', 'United States', 'India', 'Germany'], metric = 'total') => {
  try {
    const query = encodeURIComponent(countries.join(','));
    const res = await fetch(`${API_BASE}/compare?countries=${query}&metric=${metric}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error (compare), using cached default:', err.message);
    return {
      metric,
      countries,
      data: [
        { year: 1990, yearLabel: '1990', China: 2420, 'United States': 5120, India: 605, Germany: 1050 },
        { year: 1995, yearLabel: '1995', China: 3450, 'United States': 5410, India: 810, Germany: 940 },
        { year: 2000, yearLabel: '2000', China: 3405, 'United States': 6010, India: 978, Germany: 890 },
        { year: 2005, yearLabel: '2005', China: 5790, 'United States': 6130, India: 1210, Germany: 840 },
        { year: 2010, yearLabel: '2010', China: 8776, 'United States': 5702, India: 1690, Germany: 830 },
        { year: 2015, yearLabel: '2015', China: 9680, 'United States': 5370, India: 2260, Germany: 790 },
        { year: 2020, yearLabel: '2020', China: 10945, 'United States': 4715, India: 2442, Germany: 644 },
        { year: 2022, yearLabel: '2022', China: 11472, 'United States': 5057, India: 2909, Germany: 674 },
      ],
    };
  }
};

export const fetchInsights = async (year = 2022) => {
  try {
    const res = await fetch(`${API_BASE}/insights?year=${year}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error (insights), using cached default:', err.message);
    return [
      { id: 1, type: 'globe', text: 'China, the United States and India account for the largest share of global CO₂ emissions.' },
      { id: 2, type: 'trend', text: 'Global emissions have increased significantly since 1990, with continued growth in recent years.' },
      { id: 3, type: 'users', text: `The global average is around 4.6 tonnes of CO₂ per person (in ${year}).` },
    ];
  }
};
