import React from 'react';
import { Globe, Users, Leaf, BarChart2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KpiCards({ overview }) {
  if (!overview) return null;

  const { totalEmissions, countriesCovered, perCapita, yoyChangePercent, unit } = overview;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-8 relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      {/* Card 1: Total CO2 Emissions */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] hover:border-[#2F765B]/30 transition duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EAF5EE] text-[#2F765B] flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-[13px] font-medium text-[#5C6E66]">
              Total CO₂ Emissions
            </span>
            <div className="font-manrope font-bold text-2xl sm:text-3xl text-[#202824] tracking-tight mt-0.5">
              {totalEmissions ? totalEmissions.toLocaleString() : '36,827'}
            </div>
            <div className="text-xs text-[#7B8B82] mt-0.5">
              {unit || 'Million tonnes'}
            </div>
          </div>
        </div>

        {/* Bottom Change Badge */}
        <div className="mt-4 pt-3 border-t border-[#F0F4EE] flex items-center gap-2">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E9F7EC] text-[#25734C]">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {Math.abs(yoyChangePercent || 1.1)}%
          </span>
          <span className="text-xs text-[#7B8B82]">vs previous year</span>
        </div>
      </div>

      {/* Card 2: Countries Covered */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] hover:border-[#2F765B]/30 transition duration-200 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EAF5EE] text-[#2F765B] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-[13px] font-medium text-[#5C6E66]">
                Countries Covered
              </span>
              <div className="font-manrope font-bold text-2xl sm:text-3xl text-[#202824] tracking-tight mt-0.5">
                {countriesCovered || 196}
              </div>
              <div className="text-xs text-[#7B8B82] mt-0.5">
                Countries / Economies
              </div>
            </div>
          </div>

          {/* Mini World Map Silhouette */}
          <div className="opacity-25 w-16 h-12 shrink-0 pt-1 hidden sm:block">
            <svg viewBox="0 0 100 60" fill="currentColor" className="w-full h-full text-[#2F765B]">
              <path d="M15 15 Q25 10 35 20 Q30 35 20 30 Z M22 35 Q28 38 25 50 Q18 48 18 40 Z M50 12 Q70 10 80 25 Q75 35 60 25 Z M52 28 Q62 30 60 48 Q50 45 48 35 Z M80 38 Q88 40 85 48 Q78 47 79 40 Z" />
            </svg>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F0F4EE] flex items-center gap-1.5 text-xs text-[#7B8B82]">
          <span className="w-2 h-2 rounded-full bg-[#2F765B]" />
          <span>Global reporting coverage</span>
        </div>
      </div>

      {/* Card 3: CO2 per Person */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] hover:border-[#2F765B]/30 transition duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EAF5EE] text-[#2F765B] flex items-center justify-center shrink-0">
            <Leaf className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-[13px] font-medium text-[#5C6E66]">
              CO₂ per Person
            </span>
            <div className="font-manrope font-bold text-2xl sm:text-3xl text-[#202824] tracking-tight mt-0.5">
              {perCapita || 4.6}
            </div>
            <div className="text-xs text-[#7B8B82] mt-0.5">
              Tonnes per person
            </div>
          </div>
        </div>

        {/* Bottom Change Badge */}
        <div className="mt-4 pt-3 border-t border-[#F0F4EE] flex items-center gap-2">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E9F7EC] text-[#25734C]">
            <ArrowUpRight className="w-3.5 h-3.5" />
            0.5%
          </span>
          <span className="text-xs text-[#7B8B82]">vs previous year</span>
        </div>
      </div>

      {/* Card 4: Year-on-Year Change */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] hover:border-[#2F765B]/30 transition duration-200 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EAF5EE] text-[#2F765B] flex items-center justify-center shrink-0">
              <BarChart2 className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-[13px] font-medium text-[#5C6E66]">
                Year-on-Year Change
              </span>
              <div className="font-manrope font-bold text-2xl sm:text-3xl text-[#202824] tracking-tight mt-0.5">
                {(yoyChangePercent > 0 ? '+' : '') + (yoyChangePercent || 1.1)}%
              </div>
              <div className="text-xs text-[#7B8B82] mt-0.5">
                Global annual change
              </div>
            </div>
          </div>

          {/* Mini 4-Bar Sparkline Visual */}
          <div className="flex items-end gap-1.5 h-10 pt-2 shrink-0">
            <span className="w-1.5 h-3 bg-[#A3D1BE] rounded-t-sm" />
            <span className="w-1.5 h-5 bg-[#5BA886] rounded-t-sm" />
            <span className="w-1.5 h-7 bg-[#3B8E6D] rounded-t-sm" />
            <span className="w-1.5 h-9 bg-[#2F765B] rounded-t-sm" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F0F4EE] flex items-center gap-1.5 text-xs text-[#7B8B82]">
          <span className="text-[#2F765B] font-medium">Trajectory:</span>
          <span>Consistent upward trend</span>
        </div>
      </div>
    </div>
  );
}
