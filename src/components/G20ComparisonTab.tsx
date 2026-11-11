import React, { useState } from 'react';
import { 
  Globe2, 
  BarChart3, 
  Layers, 
  Maximize2, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  Info,
  CheckCircle,
  HelpCircle,
  Percent,
  Landmark,
  Scale,
  AlertTriangle
} from 'lucide-react';
import { G20_FISCAL_DATA, G20CountryFiscalData, INTERNATIONAL_BENCHMARKS, UK_FISCAL_TOTALS } from '../data/ukBudgetData';

export const G20ComparisonTab: React.FC = () => {
  const [activeMetricMode, setActiveMetricMode] = useState<'debt' | 'spending'>('debt'); // default to debt per request!
  const [filterRegion, setFilterRegion] = useState<'all' | 'g7' | 'europe' | 'americas' | 'asia'>('all');
  const [sortBy, setSortBy] = useState<'high_to_low' | 'low_to_high' | 'per_capita'>('high_to_low');
  const [selectedCountry, setSelectedCountry] = useState<G20CountryFiscalData | null>(null);

  // Filter countries
  const filteredCountries = G20_FISCAL_DATA.filter(c => {
    if (filterRegion === 'g7') return c.isG7;
    if (filterRegion === 'europe') return c.region === 'Europe';
    if (filterRegion === 'americas') return c.region === 'Americas';
    if (filterRegion === 'asia') return c.region === 'Asia-Pacific';
    return true;
  });

  // Sort countries
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (activeMetricMode === 'debt') {
      if (sortBy === 'high_to_low') return b.debtPercentGdp - a.debtPercentGdp;
      if (sortBy === 'low_to_high') return a.debtPercentGdp - b.debtPercentGdp;
      if (sortBy === 'per_capita') return b.debtPerCapitaGbp - a.debtPerCapitaGbp;
    } else {
      if (sortBy === 'high_to_low') return b.spendingPercentGdp - a.spendingPercentGdp;
      if (sortBy === 'low_to_high') return a.spendingPercentGdp - b.spendingPercentGdp;
      if (sortBy === 'per_capita') return b.spendingPerCapitaGbp - a.spendingPerCapitaGbp;
    }
    return 0;
  });

  const ukData = G20_FISCAL_DATA.find(c => c.code === 'GBR')!;

  const getDebtTierColor = (debtPct: number) => {
    if (debtPct > 200) return '#a855f7'; // Purple - Extreme (Japan)
    if (debtPct >= 100) return '#ef4444'; // Red - Heavy (>100%)
    if (debtPct >= 80) return '#f59e0b'; // Amber - Elevated (UK 98.4%)
    if (debtPct >= 50) return '#3b82f6'; // Blue - Moderate
    return '#10b981'; // Green - Low
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Primary Metric Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-fit">
          <button
            onClick={() => setActiveMetricMode('debt')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeMetricMode === 'debt'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Public Debt over GDP (%)</span>
          </button>
          <button
            onClick={() => setActiveMetricMode('spending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeMetricMode === 'spending'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Public Expenditure over GDP (%)</span>
          </button>
        </div>

        <div className="text-xs text-slate-400">
          IMF Fiscal Monitor & Sovereign Debt Databank (2024/25)
        </div>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
            <Globe2 className="w-3.5 h-3.5" />
            {activeMetricMode === 'debt' 
              ? 'G20 Sovereign Debt as % of GDP Comparison' 
              : 'G20 Public Expenditure as % of GDP Comparison'}
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {activeMetricMode === 'debt' 
              ? 'Public Debt over GDP Across G20 Nations' 
              : 'UK Public Expenditure Compared to G20 Peers'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            {activeMetricMode === 'debt'
              ? 'Comparing total accumulated sovereign liabilities as a proportion of annual gross domestic product. The UK stands at 98.4% (£2.72 Trillion), just under the 100% threshold.'
              : 'Comparing the proportion of national economic output allocated to public services, pensions, and infrastructure.'}
          </p>
        </div>

        {/* UK Quick Stat Pill */}
        <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-left md:text-right shrink-0 shadow-lg">
          <div className="text-xs text-amber-400 font-semibold flex items-center justify-start md:justify-end gap-1.5">
            <span>🇬🇧 United Kingdom Debt</span>
          </div>
          <div className="text-2xl font-black text-white mt-0.5">
            98.4% <span className="text-xs font-sans text-slate-400 font-normal">of GDP</span>
          </div>
          <div className="text-[11px] text-slate-400">
            £2,724.8bn • ~£39,950 / resident
          </div>
        </div>
      </div>

      {/* Benchmark Reference Badges */}
      {activeMetricMode === 'debt' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">UK Debt over GDP</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono mt-0.5 block">98.4%</span>
            <span className="text-[10px] text-slate-500">£2,724.8bn (AA rating)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">G7 Economies Average</span>
            <span className="text-xl font-extrabold text-red-400 font-mono mt-0.5 block">{INTERNATIONAL_BENCHMARKS.g7DebtAverage}%</span>
            <span className="text-[10px] text-slate-500">Pulled up by Japan (254%) & US (122%)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">G20 All Nations Average</span>
            <span className="text-xl font-extrabold text-blue-400 font-mono mt-0.5 block">{INTERNATIONAL_BENCHMARKS.g20DebtAverage}%</span>
            <span className="text-[10px] text-slate-500">UK is +6.0% above average</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">Maastricht Target</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5 block">{INTERNATIONAL_BENCHMARKS.maastrichtLimit}%</span>
            <span className="text-[10px] text-slate-500">EU Fiscal Stability Rule</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">UK Public Spending</span>
            <span className="text-xl font-extrabold text-blue-400 font-mono mt-0.5 block">44.3%</span>
            <span className="text-[10px] text-slate-500">£1,226.4bn / £2,768bn GDP</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">G7 Economies Average</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono mt-0.5 block">{INTERNATIONAL_BENCHMARKS.g7Average}%</span>
            <span className="text-[10px] text-slate-500">France, UK, DE, IT, US, CA, JP</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">European Union Average</span>
            <span className="text-xl font-extrabold text-indigo-400 font-mono mt-0.5 block">{INTERNATIONAL_BENCHMARKS.euAverage}%</span>
            <span className="text-[10px] text-slate-500">High social safety net models</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">OECD Average</span>
            <span className="text-xl font-extrabold text-teal-400 font-mono mt-0.5 block">{INTERNATIONAL_BENCHMARKS.oecdAverage}%</span>
            <span className="text-[10px] text-slate-500">38 democratic economies</span>
          </div>
        </div>
      )}

      {/* Control Bar: Filter by Region & Sort Metric */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        {/* Region filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setFilterRegion('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'all' ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            All G20
          </button>
          <button
            onClick={() => setFilterRegion('g7')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'g7' ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            G7 Only
          </button>
          <button
            onClick={() => setFilterRegion('europe')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'europe' ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            Europe
          </button>
          <button
            onClick={() => setFilterRegion('americas')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'americas' ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            Americas
          </button>
          <button
            onClick={() => setFilterRegion('asia')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'asia' ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            Asia-Pacific
          </button>
        </div>

        {/* Sort Metric */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:border-amber-500"
          >
            <option value="high_to_low">Highest {activeMetricMode === 'debt' ? 'Debt' : 'Spending'} First</option>
            <option value="low_to_high">Lowest {activeMetricMode === 'debt' ? 'Debt' : 'Spending'} First</option>
            <option value="per_capita">Per Capita (£/resident)</option>
          </select>
        </div>
      </div>

      {/* MAIN INTERACTIVE GRAPH CARD */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-400" />
              {activeMetricMode === 'debt' 
                ? 'Public Sector Debt as % of GDP Across G20 Nations' 
                : 'General Government Expenditure (% of GDP) Across G20'}
            </h3>
            <p className="text-xs text-slate-400">
              Select any country bar to enlarge the graph and open an interactive fiscal breakdown.
            </p>
          </div>

          {activeMetricMode === 'debt' && (
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">100% of GDP Threshold:</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
                Critical Zone
              </span>
            </div>
          )}
        </div>

        {/* Visual Bar Graph (Horizontal ranking) */}
        <div className="space-y-2.5 pt-2">
          {sortedCountries.map((country) => {
            const isUK = country.code === 'GBR';
            const value = activeMetricMode === 'debt' 
              ? country.debtPercentGdp 
              : country.spendingPercentGdp;

            // Maximum scaling: 260% for debt (Japan 254.6%), 65% for spending (France 58.3%)
            const maxVal = activeMetricMode === 'debt' ? 260 : 65;
            const barWidthPercent = (value / maxVal) * 100;
            const barColor = activeMetricMode === 'debt' 
              ? getDebtTierColor(country.debtPercentGdp)
              : isUK ? '#3b82f6' : '#64748b';

            return (
              <div
                key={country.code}
                onClick={() => setSelectedCountry(country)}
                className={`p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer group flex items-center gap-3 border ${
                  isUK
                    ? 'bg-amber-950/30 border-amber-500/60 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                {/* Country Flag & Code */}
                <div className="w-28 sm:w-36 flex items-center gap-2 shrink-0">
                  <span className="text-xl">{country.flag}</span>
                  <div className="truncate">
                    <span className={`text-xs font-bold block truncate ${isUK ? 'text-amber-300 font-black' : 'text-white'}`}>
                      {country.country}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {country.isG7 ? 'G7' : 'G20'} • {country.debtRating}
                    </span>
                  </div>
                </div>

                {/* The Bar */}
                <div className="flex-1 h-7 bg-slate-900 rounded-lg overflow-hidden flex items-center p-1 relative">
                  <div
                    style={{ 
                      width: `${Math.max(5, barWidthPercent)}%`,
                      backgroundColor: isUK ? '#f59e0b' : barColor
                    }}
                    className={`h-full rounded-md flex items-center justify-end px-2.5 transition-all duration-300 shadow-sm ${
                      isUK ? 'brightness-110 shadow-amber-500/30' : 'group-hover:brightness-110'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-white font-mono drop-shadow">
                      {value.toFixed(1)}%
                    </span>
                  </div>

                  {/* Benchmark Markers for Debt */}
                  {activeMetricMode === 'debt' && (
                    <>
                      {/* 100% of GDP Critical Marker Line */}
                      <div 
                        style={{ left: `${(INTERNATIONAL_BENCHMARKS.centuryThreshold / maxVal) * 100}%` }}
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500/80 pointer-events-none z-10"
                        title="100% of GDP Threshold"
                      />
                      {/* G7 Average Line */}
                      <div 
                        style={{ left: `${(INTERNATIONAL_BENCHMARKS.g7DebtAverage / maxVal) * 100}%` }}
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-400/50 pointer-events-none z-10"
                        title="G7 Debt Average: 127.8%"
                      />
                      {/* 60% Maastricht Target Line */}
                      <div 
                        style={{ left: `${(INTERNATIONAL_BENCHMARKS.maastrichtLimit / maxVal) * 100}%` }}
                        className="absolute top-0 bottom-0 w-0.5 bg-emerald-400/60 pointer-events-none z-10"
                        title="60% Maastricht Rule"
                      />
                    </>
                  )}
                </div>

                {/* Per Capita Column */}
                <div className="w-20 sm:w-28 text-right hidden sm:block shrink-0 font-mono text-xs text-slate-400">
                  £{(activeMetricMode === 'debt' ? country.debtPerCapitaGbp : country.spendingPerCapitaGbp).toLocaleString()}
                </div>

                {/* Enlarge Icon Action */}
                <button
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 group-hover:text-white group-hover:bg-slate-800 transition-colors shrink-0"
                  title="Enlarge graph breakdown"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Chart Reference Footnote */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800">
          {activeMetricMode === 'debt' ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-emerald-400"></span> 60% Maastricht Ceiling
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-red-500"></span> 100% of GDP Level
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-amber-400"></span> G7 Average (127.8%)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-teal-400"></span> OECD Avg (42.5%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-amber-400"></span> G7 Avg (46.2%)
              </span>
            </div>
          )}
          <span>Sources: IMF World Economic Outlook, Fiscal Monitor & ONS UK Public Sector Finances.</span>
        </div>
      </div>

      {/* Structural Fiscal Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Japan */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-purple-400">
            <span>🇯🇵 Japan (254.6% Debt)</span>
            <span>World Highest</span>
          </div>
          <h4 className="text-sm font-bold text-white">How Japan Sustains 254% Debt</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Despite debt exceeding 2.5 times GDP, over 90% of Japanese Government Bonds (JGBs) are held domestically 
            by domestic banks, life insurers, and the Bank of Japan, minimizing capital flight risks and default premiums.
          </p>
        </div>

        {/* Card 2: UK Position */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>🇬🇧 United Kingdom (98.4%)</span>
            <span>Near 100% Threshold</span>
          </div>
          <h4 className="text-sm font-bold text-white">The UK's 20-Year Debt Surge</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            UK debt stood at just 35% of GDP before the 2008 Financial Crisis. Banking bailouts, post-crisis deficits, 
            COVID-19 pandemic furlough (£313bn peak borrowing), and energy subsidies pushed debt to £2,724.8bn (98.4% of GDP).
          </p>
        </div>

        {/* Card 3: US Deficits */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-red-400">
            <span>🇺🇸 United States (122.3%)</span>
            <span>$34 Trillion</span>
          </div>
          <h4 className="text-sm font-bold text-white">Global Reserve Currency Advantage</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            US federal debt has expanded rapidly due to large structural budget deficits (exceeding 6% of GDP annually). 
            The global dominance of the US Dollar as the primary global reserve asset provides unmatched borrowing depth.
          </p>
        </div>
      </div>

      {/* ENLARGED COUNTRY MODAL (When any country bar is clicked) */}
      {selectedCountry && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCountry(null)}
        >
          <div 
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/70">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedCountry.flag}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-bold text-white">{selectedCountry.country}</h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      Credit Rating: {selectedCountry.debtRating}
                    </span>
                    <span className="text-xs text-slate-400">({selectedCountry.region})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sovereign Debt Profile & Fiscal Analysis
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCountry(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Enlarged Visual Comparison Bar */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Enlarged Public Debt Comparison</span>
                  <span className="font-mono text-amber-400">{selectedCountry.debtPercentGdp}% of GDP</span>
                </div>

                {/* Country Debt Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{selectedCountry.country}</span>
                    <span className="font-mono font-bold text-white">{selectedCountry.debtPercentGdp}%</span>
                  </div>
                  <div className="h-5 w-full bg-slate-900 rounded-lg overflow-hidden flex">
                    <div
                      style={{ width: `${(selectedCountry.debtPercentGdp / 260) * 100}%` }}
                      className="h-full bg-gradient-to-r from-amber-600 to-red-500 rounded-lg"
                    />
                  </div>
                </div>

                {/* UK Benchmark Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>🇬🇧 United Kingdom (Benchmark)</span>
                    <span className="font-mono font-bold text-amber-400">{ukData.debtPercentGdp}%</span>
                  </div>
                  <div className="h-5 w-full bg-slate-900 rounded-lg overflow-hidden flex">
                    <div
                      style={{ width: `${(ukData.debtPercentGdp / 260) * 100}%` }}
                      className="h-full bg-amber-500 rounded-lg"
                    />
                  </div>
                </div>

                {/* G7 Average Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>G7 Economies Average</span>
                    <span className="font-mono font-bold text-red-400">{INTERNATIONAL_BENCHMARKS.g7DebtAverage}%</span>
                  </div>
                  <div className="h-5 w-full bg-slate-900 rounded-lg overflow-hidden flex">
                    <div
                      style={{ width: `${(INTERNATIONAL_BENCHMARKS.g7DebtAverage / 260) * 100}%` }}
                      className="h-full bg-red-500 rounded-lg"
                    />
                  </div>
                </div>

                {/* 100% Threshold Indicator */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
                  <span>Maastricht Ceiling: 60%</span>
                  <span className="text-red-400 font-bold">100% of GDP Threshold</span>
                  <span>Scale Max: 260%</span>
                </div>
              </div>

              {/* 4 Key Figures Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Public Debt</span>
                  <span className="text-xl font-extrabold text-amber-400 font-mono mt-0.5 block">
                    {selectedCountry.debtPercentGdp}%
                  </span>
                  <span className="text-[10px] text-slate-500">of GDP</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Debt Per Resident</span>
                  <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">
                    £{selectedCountry.debtPerCapitaGbp.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500">per person (GBP)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Annual Deficit</span>
                  <span className="text-xl font-extrabold text-rose-400 font-mono mt-0.5 block">
                    {selectedCountry.deficitPercentGdp}%
                  </span>
                  <span className="text-[10px] text-slate-500">Net borrowing</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Public Spending</span>
                  <span className="text-xl font-extrabold text-blue-400 font-mono mt-0.5 block">
                    {selectedCountry.spendingPercentGdp}%
                  </span>
                  <span className="text-[10px] text-slate-500">of GDP</span>
                </div>
              </div>

              {/* Structural Context */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  Sovereign Debt Sustainability & Drivers:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedCountry.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
              <button
                onClick={() => setSelectedCountry(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
