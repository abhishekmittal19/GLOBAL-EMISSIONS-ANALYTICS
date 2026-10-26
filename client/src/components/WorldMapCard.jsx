import React, { useState } from 'react';

// Color palette mapping based on emission levels
const getEmissionColor = (val) => {
  if (val > 5000) return '#13402E'; // > 5,000
  if (val >= 1000) return '#256A4E'; // 1,000 - 5,000
  if (val >= 500) return '#3D8B6C';  // 500 - 1,000
  if (val >= 100) return '#70AD91';  // 100 - 500
  if (val >= 10) return '#A9D3BE';   // 10 - 100
  return '#DAF0E4';                  // < 10
};

export default function WorldMapCard({ countries, selectedYear, onSelectCountry }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Map country lookup table
  const countryMap = {};
  if (countries && countries.length > 0) {
    countries.forEach(c => {
      countryMap[c.country] = c;
      if (c.isoCode) countryMap[c.isoCode] = c;
    });
  }

  // Pre-configured paths for world map representing key continental landmasses and countries
  const regions = [
    // North America - USA
    {
      id: 'USA',
      name: 'United States',
      d: 'M 140 135 L 180 130 L 220 133 L 245 145 L 240 175 L 210 185 L 195 200 L 175 195 L 155 180 L 135 170 Z M 85 90 L 115 85 L 125 110 L 95 120 Z',
      emissions: countryMap['United States']?.totalEmissions || 5057,
      perCapita: countryMap['United States']?.perCapita || 14.9,
    },
    // North America - Canada
    {
      id: 'CAN',
      name: 'Canada',
      d: 'M 120 70 L 160 55 L 215 50 L 250 65 L 245 125 L 210 120 L 175 120 L 135 125 L 115 110 Z',
      emissions: countryMap['Canada']?.totalEmissions || 548,
      perCapita: countryMap['Canada']?.perCapita || 14.1,
    },
    // Central America - Mexico
    {
      id: 'MEX',
      name: 'Mexico',
      d: 'M 145 180 L 175 195 L 190 220 L 175 235 L 160 215 L 140 190 Z',
      emissions: countryMap['Mexico']?.totalEmissions || 436,
      perCapita: countryMap['Mexico']?.perCapita || 3.4,
    },
    // South America - Brazil
    {
      id: 'BRA',
      name: 'Brazil',
      d: 'M 225 240 L 275 235 L 305 265 L 285 320 L 250 330 L 230 290 Z',
      emissions: countryMap['Brazil']?.totalEmissions || 489,
      perCapita: countryMap['Brazil']?.perCapita || 2.3,
    },
    // South America - Argentina & South
    {
      id: 'ARG',
      name: 'Argentina',
      d: 'M 230 290 L 255 330 L 250 380 L 235 385 L 225 320 Z',
      emissions: countryMap['Argentina']?.totalEmissions || 190,
      perCapita: countryMap['Argentina']?.perCapita || 4.2,
    },
    // Europe - UK & Ireland
    {
      id: 'GBR',
      name: 'United Kingdom',
      d: 'M 355 105 L 368 100 L 366 120 L 354 125 Z',
      emissions: countryMap['United Kingdom']?.totalEmissions || 345,
      perCapita: countryMap['United Kingdom']?.perCapita || 5.1,
    },
    // Europe - Germany & Western Europe
    {
      id: 'DEU',
      name: 'Germany',
      d: 'M 380 115 L 405 112 L 408 135 L 385 138 Z',
      emissions: countryMap['Germany']?.totalEmissions || 674,
      perCapita: countryMap['Germany']?.perCapita || 8.1,
    },
    // Europe - France
    {
      id: 'FRA',
      name: 'France',
      d: 'M 365 125 L 385 122 L 388 150 L 365 155 Z',
      emissions: countryMap['France']?.totalEmissions || 302,
      perCapita: countryMap['France']?.perCapita || 4.5,
    },
    // Europe - Spain
    {
      id: 'ESP',
      name: 'Spain',
      d: 'M 350 155 L 375 150 L 370 178 L 345 175 Z',
      emissions: countryMap['Spain']?.totalEmissions || 235,
      perCapita: countryMap['Spain']?.perCapita || 4.9,
    },
    // Europe - Scandinavia
    {
      id: 'NOR_SWE',
      name: 'Norway / Sweden',
      d: 'M 385 60 L 410 50 L 415 95 L 395 105 Z',
      emissions: 72,
      perCapita: 5.2,
    },
    // Russia & Northern Asia
    {
      id: 'RUS',
      name: 'Russia',
      d: 'M 425 65 L 530 55 L 635 60 L 650 95 L 580 115 L 490 120 L 430 110 Z',
      emissions: countryMap['Russia']?.totalEmissions || 1761,
      perCapita: countryMap['Russia']?.perCapita || 12.1,
    },
    // China & East Asia
    {
      id: 'CHN',
      name: 'China',
      d: 'M 505 130 L 590 125 L 610 165 L 575 195 L 525 185 L 495 160 Z',
      emissions: countryMap['China']?.totalEmissions || 11472,
      perCapita: countryMap['China']?.perCapita || 8.0,
    },
    // India & South Asia
    {
      id: 'IND',
      name: 'India',
      d: 'M 485 175 L 525 170 L 525 215 L 505 240 L 480 205 Z',
      emissions: countryMap['India']?.totalEmissions || 2909,
      perCapita: countryMap['India']?.perCapita || 2.0,
    },
    // Japan
    {
      id: 'JPN',
      name: 'Japan',
      d: 'M 630 145 L 645 140 L 640 170 L 625 175 Z',
      emissions: countryMap['Japan']?.totalEmissions || 1107,
      perCapita: countryMap['Japan']?.perCapita || 8.9,
    },
    // Middle East - Saudi Arabia & Iran
    {
      id: 'SAU_IRN',
      name: 'Saudi Arabia / Iran',
      d: 'M 430 155 L 475 150 L 480 195 L 440 215 Z',
      emissions: 1362,
      perCapita: 13.0,
    },
    // Africa - North (Egypt, etc.)
    {
      id: 'EGY_NAF',
      name: 'North Africa',
      d: 'M 355 185 L 440 180 L 430 220 L 350 225 Z',
      emissions: 320,
      perCapita: 2.2,
    },
    // Africa - Sub-Saharan & South Africa
    {
      id: 'ZAF_SSA',
      name: 'Sub-Saharan Africa & South Africa',
      d: 'M 365 228 L 430 225 L 440 310 L 405 345 L 375 300 Z',
      emissions: 580,
      perCapita: 1.8,
    },
    // Southeast Asia - Indonesia
    {
      id: 'IDN',
      name: 'Indonesia & SE Asia',
      d: 'M 550 210 L 600 205 L 620 235 L 555 245 Z',
      emissions: countryMap['Indonesia']?.totalEmissions || 618,
      perCapita: countryMap['Indonesia']?.perCapita || 2.2,
    },
    // Oceania - Australia
    {
      id: 'AUS',
      name: 'Australia',
      d: 'M 590 270 L 650 265 L 660 325 L 600 330 Z',
      emissions: countryMap['Australia']?.totalEmissions || 395,
      perCapita: countryMap['Australia']?.perCapita || 15.2,
    },
  ];

  const legendItems = [
    { label: '> 5,000', color: '#13402E' },
    { label: '1,000 – 5,000', color: '#256A4E' },
    { label: '500 – 1,000', color: '#3D8B6C' },
    { label: '100 – 500', color: '#70AD91' },
    { label: '10 – 100', color: '#A9D3BE' },
    { label: '< 10', color: '#DAF0E4' },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] flex flex-col justify-between relative">
      {/* Header */}
      <div className="mb-3">
        <h2 className="font-manrope font-bold text-lg sm:text-xl text-[#202824] tracking-tight">
          CO₂ Emissions by Country
        </h2>
        <p className="text-xs sm:text-[13px] text-[#6A7870] mt-0.5">
          Total emissions in {selectedYear} (Million tonnes)
        </p>
      </div>

      {/* Map & Legend Container */}
      <div 
        className="relative flex flex-col md:flex-row items-center justify-between gap-4 mt-2"
        onMouseMove={handleMouseMove}
      >
        {/* SVG World Map */}
        <div className="w-full flex-1 aspect-[16/10] relative">
          <svg
            viewBox="50 30 640 370"
            className="w-full h-full drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle ocean grid lines */}
            <line x1="50" y1="210" x2="690" y2="210" stroke="#EEF4ED" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="370" y1="30" x2="370" y2="400" stroke="#EEF4ED" strokeWidth="1" strokeDasharray="4 4" />

            {regions.map((region) => {
              const fillColor = getEmissionColor(region.emissions);
              const isHovered = hoveredCountry?.id === region.id;

              return (
                <path
                  key={region.id}
                  d={region.d}
                  fill={fillColor}
                  stroke="#FFFFFF"
                  strokeWidth={isHovered ? '2' : '1'}
                  className="transition-all duration-200 cursor-pointer hover:opacity-90"
                  style={{
                    filter: isHovered ? 'brightness(1.15) drop-shadow(0 2px 4px rgba(0,0,0,0.15))' : 'none',
                  }}
                  onMouseEnter={() => setHoveredCountry(region)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => {
                    if (onSelectCountry) {
                      onSelectCountry(region.name.split('/')[0].trim());
                    }
                  }}
                />
              );
            })}
          </svg>

          {/* Floating Hover Tooltip */}
          {hoveredCountry && (
            <div
              className="absolute z-30 pointer-events-none bg-[#163D33] text-white p-2.5 rounded-lg shadow-xl text-xs border border-emerald-600/50 backdrop-blur-sm transform -translate-x-1/2 -translate-y-full font-inter"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 10}px`,
              }}
            >
              <div className="font-bold text-sm text-[#D9EFAB] font-manrope">
                {hoveredCountry.name}
              </div>
              <div className="text-white mt-0.5">
                Emissions: <span className="font-semibold">{hoveredCountry.emissions.toLocaleString()} Mt</span>
              </div>
              <div className="text-emerald-200/80 text-[11px]">
                Per capita: {hoveredCountry.perCapita} tonnes
              </div>
              <div className="text-[10px] text-[#A6C9B8] mt-1 border-t border-emerald-700/60 pt-1">
                Click to add to comparison chart
              </div>
            </div>
          )}
        </div>

        {/* Legend on Right side matching image */}
        <div className="flex md:flex-col flex-wrap gap-2 sm:gap-2.5 text-xs text-[#4A5751] shrink-0 pl-2">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-[11px] sm:text-xs text-[#35423C] whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
