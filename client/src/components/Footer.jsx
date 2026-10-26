import React from "react";
import { Database, Calendar, Leaf } from "lucide-react";

export default function Footer({ selectedYear }) {
  return (
    <footer className="mt-12 border-t border-[#E1E7DF] bg-[#F7F8F4] py-6 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5C6E66]">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <span className="font-manrope font-bold text-sm tracking-tight text-[#202824]">
            TerraScope
          </span>
          <span className="text-[10px] tracking-widest text-[#7E8D86] uppercase font-semibold">
            GLOBAL EMISSIONS ANALYTICS
          </span>
        </div>

        {/* Center: Data Provenance & Reporting Year */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-center text-[#5C6E66]">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#2F765B]" />
            <span>
              Data source: Our World in Data (based on Global Carbon Project)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#2F765B]" />
            <span>Latest available year: {selectedYear}</span>
          </div>
        </div>

        {/* Right: Vision & Leaf Icon */}
        <div className="flex items-center gap-2 text-[#485952]">
          <span>Explore data. Understand impact. For a cleaner tomorrow.</span>
          <div className="w-5 h-5 rounded-full bg-[#2F765B] flex items-center justify-center text-white shrink-0">
            <Leaf className="w-3 h-3 text-[#D9EFAB]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
