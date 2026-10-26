import React from 'react';

export default function Top10RankingCard({ top10, onSelectCountry }) {
  const maxEmissions = top10 && top10.length > 0 ? top10[0].totalEmissions : 11472;

  // Country SVG flag components or visual badges
  const renderFlag = (isoCode, flag) => {
    // If emoji flag displays cleanly
    return (
      <span className="text-base leading-none select-none drop-shadow-xs" role="img" aria-label={isoCode}>
        {flag || '🌐'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] flex flex-col justify-between">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-manrope font-bold text-lg sm:text-xl text-[#202824] tracking-tight">
          Top 10 Emitting Countries
        </h2>
        <p className="text-xs sm:text-[13px] text-[#6A7870] mt-0.5">
          By total CO₂ emissions (Million tonnes)
        </p>
      </div>

      {/* Top 10 List */}
      <div className="space-y-2.5">
        {top10.map((item) => {
          const widthPercent = Math.max(3, (item.totalEmissions / maxEmissions) * 100);

          return (
            <div
              key={item.country}
              onClick={() => onSelectCountry && onSelectCountry(item.country)}
              title={`${item.country}: ${item.totalEmissions.toLocaleString()} Mt (${item.shareOfGlobal}% of world emissions)`}
              className="group flex items-center gap-2 sm:gap-3 py-0.5 px-1.5 -mx-1.5 rounded-lg hover:bg-[#F6FAF6] transition-colors cursor-pointer"
            >
              {/* Rank */}
              <span className="w-4 text-xs font-semibold text-[#7E8B84] text-right font-manrope">
                {item.rank}
              </span>

              {/* Flag */}
              <div className="w-5 text-center flex items-center justify-center shrink-0">
                {renderFlag(item.isoCode, item.flag)}
              </div>

              {/* Country Name */}
              <span className="w-24 sm:w-28 text-xs font-medium text-[#202824] truncate group-hover:text-[#2F765B] transition-colors">
                {item.country}
              </span>

              {/* Horizontal Bar */}
              <div className="flex-1 h-3.5 bg-[#EFF4EE] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#2F765B] rounded-full transition-all duration-500 group-hover:bg-[#245D48]"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>

              {/* Emissions Value */}
              <span className="w-14 sm:w-16 text-right text-xs font-semibold text-[#202824] font-manrope">
                {item.totalEmissions.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
