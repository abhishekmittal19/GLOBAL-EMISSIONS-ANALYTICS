import React from 'react';
import { Lightbulb, Globe, TrendingUp, Users } from 'lucide-react';

export default function InsightsCard({ insights, selectedYear }) {
  const getIcon = (type) => {
    switch (type) {
      case 'globe':
        return <Globe className="w-5 h-5 text-[#2F765B]" />;
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-[#2F765B]" />;
      case 'users':
      default:
        return <Users className="w-5 h-5 text-[#2F765B]" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500/20" />
        <h2 className="font-manrope font-bold text-lg sm:text-xl text-[#202824] tracking-tight">
          Insights
        </h2>
      </div>

      {/* 3 Key Insights */}
      <div className="space-y-4 my-auto">
        {insights.map((item) => (
          <div key={item.id} className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EAF5EE] flex items-center justify-center shrink-0 mt-0.5">
              {getIcon(item.type)}
            </div>
            <p className="text-xs sm:text-[13px] text-[#33403A] leading-relaxed font-normal">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer subtle tip */}
      <div className="mt-4 pt-3 border-t border-[#F0F4EE] text-[11px] text-[#7B8B82] flex items-center justify-between">
        <span>Verified IPCC & GCP statistics</span>
        <span className="font-semibold text-[#2F765B]">Year {selectedYear}</span>
      </div>
    </div>
  );
}
