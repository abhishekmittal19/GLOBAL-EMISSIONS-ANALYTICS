import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import KpiCards from "./components/KpiCards";
import EmissionsTrendCard from "./components/EmissionsTrendCard";
import Top10RankingCard from "./components/Top10RankingCard";
import WorldMapCard from "./components/WorldMapCard";
import CountryComparisonCard from "./components/CountryComparisonCard";
import InsightsCard from "./components/InsightsCard";
import AnalysisView from "./components/AnalysisView";
import Footer from "./components/Footer";
import {
  fetchOverview,
  fetchTrends,
  fetchTop10,
  fetchCountries,
  fetchComparison,
  fetchInsights,
} from "./services/api";

export default function App() {
  const [selectedYear, setSelectedYear] = useState([]);
  console.log(selectedYear)
  const [activeTab, setActiveTab] = useState("dashboard");

  // KPI Data
  const [overview, setOverview] = useState(null);

  // Trend Chart State
  const [trends, setTrends] = useState([]);
  const [trendMetric, setTrendMetric] = useState("total");

  // Top 10 Countries State
  const [top10, setTop10] = useState([]);

  // All Countries Data
  const [countries, setCountries] = useState([]);

  // Comparison State
  const [selectedCountries, setSelectedCountries] = useState([
    "China",
    "United States",
    "India",
    "Germany",
  ]);
  const [compareMetric, setCompareMetric] = useState("total");
  const [comparisonData, setComparisonData] = useState([]);

  // Insights State
  const [insights, setInsights] = useState([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load year-specific datasets
  useEffect(() => {
    let isMounted = true;
    async function loadYearData() {
      try {
        const [overviewRes, top10Res, countriesRes, insightsRes] =
          await Promise.all([
            fetchOverview(selectedYear),
            fetchTop10(selectedYear),
            fetchCountries(selectedYear),
            fetchInsights(selectedYear),
          ]);

        if (isMounted) {
          setOverview(overviewRes);
          setTop10(top10Res);
          setCountries(countriesRes);
          setInsights(insightsRes);
        }
      } catch (err) {
        console.error("Error loading year data:", err);
      }
    }

    loadYearData();
    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  // Load trends dataset when trendMetric changes
  useEffect(() => {
    let isMounted = true;
    async function loadTrends() {
      try {
        const data = await fetchTrends(trendMetric);
        if (isMounted) setTrends(data);
      } catch (err) {
        console.error("Error loading trends:", err);
      }
    }
    loadTrends();
    return () => {
      isMounted = false;
    };
  }, [trendMetric]);

  // Load comparison dataset when countries or compareMetric changes
  useEffect(() => {
    let isMounted = true;
    async function loadComparison() {
      try {
        const res = await fetchComparison(selectedCountries, compareMetric);
        if (isMounted && res && res.data) {
          setComparisonData(res.data);
        }
      } catch (err) {
        console.error("Error loading comparison:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadComparison();
    return () => {
      isMounted = false;
    };
  }, [selectedCountries, compareMetric]);

  // Toggle country in comparison
  const handleToggleCountry = (countryName) => {
    setSelectedCountries((prev) => {
      if (prev.includes(countryName)) {
        if (prev.length <= 1) return prev; // Keep at least 1
        return prev.filter((c) => c !== countryName);
      } else {
        return [...prev, countryName];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F4] text-[#202824] font-inter">
      {/* 1. Header with TerraScope brand, year selector & navigation */}
      <Header
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-10">
        {activeTab === "dashboard" ? (
          <>
            {/* 2. Four KPI Cards */}
            <KpiCards overview={overview} />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-6 space-y-6">
              {/* 3. Middle Row: Global Emissions Trend & Top 10 Emitting Countries */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <EmissionsTrendCard
                    trends={trends}
                    metric={trendMetric}
                    onMetricChange={setTrendMetric}
                  />
                </div>
                <div className="lg:col-span-5">
                  <Top10RankingCard
                    top10={top10}
                    onSelectCountry={handleToggleCountry}
                  />
                </div>
              </div>

              {/* 4. Bottom Row: Map, Country Comparison & Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                <div className="md:col-span-2 lg:col-span-4">
                  <WorldMapCard
                    countries={countries}
                    selectedYear={selectedYear}
                    onSelectCountry={handleToggleCountry}
                  />
                </div>
                <div className="md:col-span-1 lg:col-span-5">
                  <CountryComparisonCard
                    comparisonData={comparisonData}
                    selectedCountries={selectedCountries}
                    onToggleCountry={handleToggleCountry}
                    metric={compareMetric}
                    onMetricChange={setCompareMetric}
                  />
                </div>
                <div className="md:col-span-1 lg:col-span-3">
                  <InsightsCard
                    insights={insights}
                    selectedYear={selectedYear}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Analysis Tab View */
          <AnalysisView
            countries={countries}
            selectedYear={selectedYear}
            selectedCountries={selectedCountries}
            onToggleCountry={handleToggleCountry}
            onSwitchTab={setActiveTab}
          />
        )}
      </main>

      {/* 5. Footer */}
      <Footer selectedYear={selectedYear} />
    </div>
  );
}
