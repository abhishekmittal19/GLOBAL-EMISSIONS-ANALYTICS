import React, { useState, useRef, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Search, ChevronDown, X } from 'lucide-react';

const COUNTRY_COLORS = {
  China: '#DC2626',
  'United States': '#2563EB',
  India: '#D97706',
  Germany: '#0D9488',
  Russia: '#9333EA',
  Japan: '#EC4899',
  Iran: '#0284C7',
  'Saudi Arabia': '#14B8A6',
  Indonesia: '#EAB308',
  'South Korea': '#6366F1',
  Canada: '#F43F5E',
  Brazil: '#10B981',
  'United Kingdom': '#3B82F6',
  France: '#06B6D4',
  Australia: '#F97316',
};

const ALL_AVAILABLE_COUNTRIES = [
  'China',
  'United States',
  'India',
  'Russia',
  'Japan',
  'Iran',
  'Germany',
  'Saudi Arabia',
  'Indonesia',
  'South Korea',
  'Canada',
  'Brazil',
  'United Kingdom',
  'France',
  'Australia',
];

export default function CountryComparisonCard({
  comparisonData,
  selectedCountries,
  onToggleCountry,
  metric,
  onMetricChange,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = ALL_AVAILABLE_COUNTRIES.filter(
    (c) =>
      c.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedCountries.includes(c)
  );

  const formatYAxis = (tick) => {
    if (tick === 0) return '0';
    if (tick >= 1000) return `${tick.toLocaleString()}`;
    return `${tick}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#163D33] text-white p-3 rounded-xl shadow-xl text-xs border border-emerald-700/60 font-inter">
          <div className="font-semibold text-[#D9EFAB] border-b border-emerald-800/80 pb-1 mb-1.5">
            Year {label} — {metric === 'perCapita' ? 'Tonnes / person' : 'Million tonnes'}
          </div>
          <div className="space-y-1">
            {payload.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-emerald-100">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name}:
                </span>
                <span className="font-bold text-white font-manrope">
                  {typeof entry.value === 'number'
                    ? entry.value.toLocaleString()
                    : entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="font-manrope font-bold text-lg sm:text-xl text-[#202824] tracking-tight">
          Country Comparison
        </h2>
        <p className="text-xs sm:text-[13px] text-[#6A7870] mt-0.5">
          Compare total emissions or per capita
        </p>

        {/* Searchable Multi-Select Country Input */}
        <div className="relative mt-3" ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen(true)}
            className="flex items-center justify-between px-3 py-2 rounded-xl border border-[#D5DDD2] bg-[#F7F9F6] text-xs cursor-pointer hover:border-[#2F765B]/50 transition"
          >
            <div className="flex items-center gap-2 flex-1 overflow-hidden">
              <Search className="w-4 h-4 text-[#7A8881] shrink-0" />
              <input
                type="text"
                placeholder="Select countries (e.g. India, Germany, Brazil)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                className="bg-transparent border-none outline-none text-xs text-[#202824] placeholder-[#85948D] w-full"
              />
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[#7A8881] transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Autocomplete Dropdown List */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-[#D5DDD2] rounded-xl shadow-xl z-40 py-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => {
                      onToggleCountry(country);
                      setSearchQuery('');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-[#202824] hover:bg-[#F2F7F3] flex items-center justify-between cursor-pointer"
                  >
                    <span>{country}</span>
                    <span className="text-[10px] text-[#2F765B] font-medium">+ Add</span>
                  </button>
                ))
              ) : (
                <div className="px-3.5 py-2 text-xs text-[#7A8881]">
                  No matching countries or all selected
                </div>
              )}
            </div>
          )}

          {/* Selected Countries Chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {selectedCountries.map((country) => {
              const color = COUNTRY_COLORS[country] || '#2F765B';
              return (
                <span
                  key={country}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F6F2] text-[#202824] border border-[#DEE7DF]"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{country}</span>
                  {selectedCountries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onToggleCountry(country)}
                      className="text-[#7A8881] hover:text-red-500 transition cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Radio Metric Selector */}
        <div className="flex items-center gap-6 mt-3 pt-2 text-xs font-medium text-[#4A5751]">
          <span className="text-[#7A8881] text-[11px] uppercase tracking-wider">Metric</span>
          
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="compareMetric"
              value="total"
              checked={metric === 'total'}
              onChange={() => onMetricChange('total')}
              className="accent-[#2F765B] w-3.5 h-3.5 cursor-pointer"
            />
            <span className={metric === 'total' ? 'text-[#163D33] font-semibold' : ''}>
              Total Emissions
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="compareMetric"
              value="perCapita"
              checked={metric === 'perCapita'}
              onChange={() => onMetricChange('perCapita')}
              className="accent-[#2F765B] w-3.5 h-3.5 cursor-pointer"
            />
            <span className={metric === 'perCapita' ? 'text-[#163D33] font-semibold' : ''}>
              Emissions per Person
            </span>
          </label>
        </div>
      </div>

      {/* Multi-Line Comparison Chart */}
      <div className="w-full h-[180px] sm:h-[195px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7EDE4" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: '#DFE5DC' }}
              tick={{ fill: '#738079', fontSize: 10, fontFamily: 'Inter' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#738079', fontSize: 10, fontFamily: 'Inter' }}
              tickFormatter={formatYAxis}
              domain={[0, 'auto']}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            {selectedCountries.map((country) => (
              <Line
                key={country}
                type="monotone"
                dataKey={country}
                stroke={COUNTRY_COLORS[country] || '#2F765B'}
                strokeWidth={2}
                dot={{ r: 2.5, fill: COUNTRY_COLORS[country] || '#2F765B' }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] text-[#55635D]">
        {selectedCountries.map((country) => (
          <div key={country} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-0.5 rounded-full"
              style={{ backgroundColor: COUNTRY_COLORS[country] || '#2F765B' }}
            />
            <span>{country}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
