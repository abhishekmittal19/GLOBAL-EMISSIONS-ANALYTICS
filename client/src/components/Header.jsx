import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe2, Leaf } from "lucide-react";

export default function Header({
  selectedYear,
  onSelectYear,
  activeTab,
  onSelectTab,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(dropdownOpen);
  const dropdownRef = useRef(null);
  const years = [2022, 2020, 2015, 2010, 2005, 2000, 1995, 1990];
  console.log(years);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("19");
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative bg-[#163D33] text-white overflow-hidden pb-12 pt-6 px-4 sm:px-8 lg:px-12 transition-colors">
      {/* Background Subtle Earth Graphic & Atmospheric Lighting */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[340px] pointer-events-none opacity-25 lg:opacity-40 select-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 85% 15%, rgba(130, 210, 160, 0.45) 0%, rgba(47, 118, 91, 0.3) 35%, transparent 70%)",
        }}
      />

      {/* Realistic subtle Earth orb outline */}
      <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full border border-emerald-400/20 pointer-events-none opacity-40 shadow-[0_0_120px_rgba(47,118,91,0.5)]" />
      <div className="absolute -top-24 -right-8 w-80 h-80 rounded-full border border-emerald-300/10 pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Navbar Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onSelectTab("dashboard")}
          >
            <div className="w-10 h-10 rounded-full bg-[#2F765B] border border-[#3E8B6E] flex items-center justify-center shadow-inner">
              <Leaf className="w-5 h-5 text-[#D9EFAB]" />
            </div>
            <div>
              <div className="font-manrope font-bold text-2xl tracking-tight leading-none text-white">
                GLOBAL EMISSIONS ANALYTICS
              </div>
              <div className="text-[9px] font-semibold tracking-[0.22em] text-[#A6C9B8] uppercase mt-1">
                GLOBAL EMISSIONS ANALYTICS
              </div>
            </div>
          </div>

          {/* Navigation Pill Switcher */}
          <div className="flex items-center bg-[#102B24]/90 p-1 rounded-full border border-emerald-900/40 shadow-sm backdrop-blur-sm">
            <button
              onClick={() => onSelectTab("dashboard")}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-white/20 text-white shadow-sm border border-white/15"
                  : "text-emerald-200/70 hover:text-white"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onSelectTab("analysis")}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === "analysis"
                  ? "bg-white/20 text-white shadow-sm border border-white/15"
                  : "text-emerald-200/70 hover:text-white"
              }`}
            >
              Analysis
            </button>
          </div>

          {/* Right Controls: Year Selector & Motto Badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Year Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-sm font-medium transition-all shadow-sm backdrop-blur-sm cursor-pointer"
                aria-expanded={dropdownOpen}
              >
                <span className="text-emerald-200/75 text-xs font-normal">
                  Year
                </span>
                <span className="font-semibold text-white tracking-wide">
                  {selectedYear}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-emerald-200/90 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#163D33] border border-emerald-700/50 rounded-xl shadow-2xl py-1 z-50 backdrop-blur-md overflow-hidden">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-emerald-300/60 uppercase tracking-wider border-b border-emerald-800/40">
                    Reporting Year
                  </div>
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        onSelectYear(year);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-[#2F765B]/60 transition cursor-pointer ${
                        year === selectedYear
                          ? "text-[#D9EFAB] font-bold bg-[#2F765B]/30"
                          : "text-emerald-100"
                      }`}
                    >
                      <span>{year}</span>
                      {year === selectedYear && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D9EFAB]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Eco Badge */}
            <div className="hidden md:flex items-center gap-2.5 pl-2 border-l border-emerald-800/60">
              <div className="w-7 h-7 rounded-full border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Globe2 className="w-4 h-4" />
              </div>
              <div className="text-[11px] leading-tight text-emerald-100/90 font-normal">
                <div>A cleaner planet</div>
                <div className="text-emerald-300/80">through clearer data</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="pt-2 pb-2">
          <h1 className="font-manrope text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight">
            Global CO₂ Emissions at a Glance
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/80 mt-2 max-w-2xl font-normal leading-relaxed">
            Explore how much CO₂ countries emit, compare their impact, and
            understand global trends.
          </p>
        </div>
      </div>
    </header>
  );
}
