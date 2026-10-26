import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

export default function EmissionsTrendCard({ trends, metric, onMetricChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const metricLabels = {
    total: 'Total Emissions',
    perCapita: 'CO₂ per Capita',
    cumulative: 'Cumulative Emissions',
  };

  const currentUnit = {
    total: 'Million tonnes',
    perCapita: 'Tonnes / person',
    cumulative: 'Million tonnes',
  }[metric] || 'Million tonnes';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#163D33] text-white p-3 rounded-xl shadow-xl text-xs border border-emerald-700/60 font-inter">
          <div className="font-semibold text-emerald-200 border-b border-emerald-800/80 pb-1 mb-1.5 flex items-center justify-between gap-4">
            <span>Year {label}</span>
            <span className="text-[#D9EFAB]">{data.yoy ? `${data.yoy > 0 ? '+' : ''}${data.yoy}% YoY` : ''}</span>
          </div>
          <div className="text-sm font-bold text-white font-manrope">
            {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString() : payload[0].value} {currentUnit}
          </div>
          <div className="text-[11px] text-emerald-200/70 mt-1">
            Global carbon footprint tracking
          </div>
        </div>
      );
    }
    return null;
  };

  // Format Y-axis tick values (e.g. 10,000, 20,000)
  const formatYAxis = (tick) => {
    if (tick === 0) return '0';
    if (tick >= 1000) return `${tick.toLocaleString()}`;
    return `${tick}`;
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] flex flex-col justify-between">
      {/* Card Header with Title & View Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-manrope font-bold text-lg sm:text-xl text-[#202824] tracking-tight">
            Global CO₂ Emissions Trend
          </h2>
          <p className="text-xs sm:text-[13px] text-[#6A7870] mt-0.5">
            Annual global CO₂ emissions ({currentUnit})
          </p>
        </div>

        {/* View Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D5DDD2] bg-[#F7F9F6] text-xs font-medium text-[#202824] hover:bg-[#EEF3ED] transition cursor-pointer"
          >
            <span className="text-[#6A7870]">View:</span>
            <span className="font-semibold text-[#163D33]">{metricLabels[metric] || 'Total Emissions'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#5F6E66]" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-[#D5DDD2] rounded-xl shadow-lg py-1 z-30 overflow-hidden">
              {Object.entries(metricLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    onMetricChange(key);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition cursor-pointer ${
                    metric === key
                      ? 'bg-[#EBF5EF] text-[#2F765B] font-semibold'
                      : 'text-[#3D4742] hover:bg-[#F7F9F6]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[260px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2F765B" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#2F765B" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7EDE4" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: '#DFE5DC' }}
              tick={{ fill: '#738079', fontSize: 11, fontFamily: 'Inter' }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#738079', fontSize: 11, fontFamily: 'Inter' }}
              tickFormatter={formatYAxis}
              domain={[0, 'auto']}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2F765B"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#emissionsGradient)"
              dot={{ stroke: '#2F765B', strokeWidth: 2, r: 3.5, fill: '#FFFFFF' }}
              activeDot={{ stroke: '#163D33', strokeWidth: 2, r: 6, fill: '#D9EFAB' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
