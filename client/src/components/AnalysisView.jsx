import React, { useState } from 'react';
import { Search, ArrowUpDown, Plus, Check, Filter } from 'lucide-react';

export default function AnalysisView({
  countries,
  selectedYear,
  selectedCountries,
  onToggleCountry,
  onSwitchTab,
}) {
  const [search, setSearch] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [sortField, setSortField] = useState('rank');
  const [sortAsc, setSortAsc] = useState(true);

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];

  const filtered = (countries || [])
    .filter((c) => {
      const matchSearch = c.country.toLowerCase().includes(search.toLowerCase());
      const matchContinent =
        selectedContinent === 'All' || c.continent.toLowerCase().includes(selectedContinent.toLowerCase());
      return matchSearch && matchContinent;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'country' ? true : false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-manrope font-bold text-2xl text-[#202824] tracking-tight">
              Detailed Country Emissions Breakdown ({selectedYear})
            </h2>
            <p className="text-sm text-[#6A7870] mt-1">
              Explore emissions data, per capita footprints, and global percentages across all reporting nations.
            </p>
          </div>

          <button
            onClick={() => onSwitchTab('dashboard')}
            className="self-start md:self-auto px-4 py-2 bg-[#163D33] text-white text-xs font-semibold rounded-xl hover:bg-[#2F765B] transition shadow-xs cursor-pointer"
          >
            ← Return to Dashboard
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-[#F0F4EE]">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#7A8881] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5DDD2] bg-[#F7F9F6] text-xs text-[#202824] outline-none focus:border-[#2F765B]"
            />
          </div>

          {/* Continent Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {continents.map((continent) => (
              <button
                key={continent}
                onClick={() => setSelectedContinent(continent)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedContinent === continent
                    ? 'bg-[#2F765B] text-white shadow-xs'
                    : 'bg-[#F2F6F3] text-[#55665E] hover:bg-[#E5ECE7]'
                }`}
              >
                {continent}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Country Table */}
      <div className="bg-white rounded-2xl border border-[#E3E8E1] shadow-[0_2px_8px_rgba(22,61,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAF7] border-b border-[#E7EDE5] text-[#5C6E66] font-semibold uppercase tracking-wider text-[11px]">
                <th
                  onClick={() => handleSort('rank')}
                  className="py-3 px-4 cursor-pointer hover:text-[#163D33]"
                >
                  <div className="flex items-center gap-1">
                    <span>Rank</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('country')}
                  className="py-3 px-4 cursor-pointer hover:text-[#163D33]"
                >
                  <div className="flex items-center gap-1">
                    <span>Country</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Continent</th>
                <th
                  onClick={() => handleSort('totalEmissions')}
                  className="py-3 px-4 cursor-pointer hover:text-[#163D33] text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Total Emissions (Mt)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('perCapita')}
                  className="py-3 px-4 cursor-pointer hover:text-[#163D33] text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Per Capita (t)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('shareOfGlobal')}
                  className="py-3 px-4 cursor-pointer hover:text-[#163D33] text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>% Share of Global</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Compare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4EE] text-[#202824]">
              {filtered.map((item) => {
                const isSelected = selectedCountries.includes(item.country);

                return (
                  <tr
                    key={item.country}
                    className="hover:bg-[#F9FCFA] transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-[#7E8B84] font-manrope">
                      #{item.rank}
                    </td>
                    <td className="py-3 px-4 font-medium flex items-center gap-2.5">
                      <span className="text-base">{item.flag || '🌐'}</span>
                      <span className="font-semibold text-[#163D33]">{item.country}</span>
                    </td>
                    <td className="py-3 px-4 text-[#5F6E66]">
                      {item.continent}
                    </td>
                    <td className="py-3 px-4 text-right font-bold font-manrope">
                      {item.totalEmissions.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {item.perCapita}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF5EE] text-[#25734C]">
                        {item.shareOfGlobal}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onToggleCountry(item.country)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#D9EFAB] text-[#163D33] font-semibold'
                            : 'bg-[#F2F6F3] text-[#4F6058] hover:bg-[#E5ECE7]'
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>{isSelected ? 'Added' : 'Compare'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
