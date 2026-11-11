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
  Percent
} from 'lucide-react';
import { G20_FISCAL_DATA, G20CountryFiscalData, INTERNATIONAL_BENCHMARKS } from '../data/ukBudgetData';

export const G20ComparisonTab: React.FC = () => {
  const [filterRegion, setFilterRegion] = useState<'all' | 'g7' | 'europe' | 'americas' | 'asia'>('all');
  const [sortBy, setSortBy] = useState<'spending' | 'revenue' | 'deficit' | 'debt'>('spending');
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
    if (sortBy === 'spending') return b.spendingPercentGdp - a.spendingPercentGdp;
    if (sortBy === 'revenue') return b.revenuePercentGdp - a.revenuePercentGdp;
    if (sortBy === 'deficit') return a.deficitPercentGdp - b.deficitPercentGdp; // lowest/widest deficit first
    if (sortBy === 'debt') return b.debtPercentGdp - a.debtPercentGdp;
    return 0;
  });

  const ukData = G20_FISCAL_DATA.find(c => c.code === 'GBR')!;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            <Globe2 className="w-3.5 h-3.5" />
            International Public Expenditure Comparison
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            UK Public Spending Compared to G20 & Global Peers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            How the United Kingdom's state size (<strong>44.3% of GDP</strong>) ranks against the world's 20 largest economies.
            Click any bar to enlarge the graph and explore detailed breakdowns with figures and percentages.
          </p>
        </div>

        {/* UK Quick Stat Pill */}
        <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/30 text-left md:text-right shrink-0 shadow-lg">
          <div className="text-xs text-blue-400 font-semibold flex items-center justify-start md:justify-end gap-1.5">
            <span>🇬🇧 United Kingdom</span>
          </div>
          <div className="text-2xl font-black text-white mt-0.5">
            44.3% <span className="text-xs font-sans text-slate-400 font-normal">of GDP</span>
          </div>
          <div className="text-[11px] text-slate-400">
            5th in G7 • Above OECD avg (42.5%)
          </div>
        </div>
      </div>

      {/* Benchmark Reference Badges */}
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

      {/* Control Bar: Filter by Region & Sort Metric */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        {/* Region filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setFilterRegion('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            All G20
          </button>
          <button
            onClick={() => setFilterRegion('g7')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'g7' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            G7 Only
          </button>
          <button
            onClick={() => setFilterRegion('europe')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'europe' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            Europe
          </button>
          <button
            onClick={() => setFilterRegion('americas')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'americas' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
          >
            Americas
          </button>
          <button
            onClick={() => setFilterRegion('asia')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterRegion === 'asia' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
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
            className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="spending">Public Spending % of GDP</option>
            <option value="revenue">Government Revenue % of GDP</option>
            <option value="deficit">Annual Deficit % of GDP</option>
            <option value="debt">Public Debt % of GDP</option>
          </select>
        </div>
      </div>

      {/* Main Interactive G20 Comparison Bar Chart */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              General Government Expenditure (% of GDP) Across G20
            </h3>
            <p className="text-xs text-slate-400">
              Select any country bar to enlarge the graph and open an interactive fiscal breakdown.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
            <span>United Kingdom</span>
            <span className="w-3 h-3 rounded-sm bg-slate-700 inline-block ml-3"></span>
            <span>Other G20</span>
          </div>
        </div>

        {/* Visual Bar Graph (Horizontal ranking) */}
        <div className="space-y-2.5 pt-2">
          {sortedCountries.map((country, index) => {
            const isUK = country.code === 'GBR';
            const value = sortBy === 'spending' 
              ? country.spendingPercentGdp 
              : sortBy === 'revenue' 
              ? country.revenuePercentGdp 
              : sortBy === 'deficit' 
              ? Math.abs(country.deficitPercentGdp) 
              : country.debtPercentGdp;

            // Normalize width against max value in dataset
            const maxVal = sortBy === 'debt' ? 260 : 65;
            const barWidthPercent = (value / maxVal) * 100;

            return (
              <div
                key={country.code}
                onClick={() => setSelectedCountry(country)}
                className={`p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer group flex items-center gap-3 border ${
                  isUK
                    ? 'bg-blue-950/40 border-blue-500/60 ring-1 ring-blue-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                {/* Country Flag & Code */}
                <div className="w-28 sm:w-36 flex items-center gap-2 shrink-0">
                  <span className="text-xl">{country.flag}</span>
                  <div className="truncate">
                    <span className={`text-xs font-bold block truncate ${isUK ? 'text-blue-300 font-black' : 'text-white'}`}>
                      {country.country}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {country.isG7 ? 'G7' : 'G20'} • {country.region}
                    </span>
                  </div>
                </div>

                {/* The Bar */}
                <div className="flex-1 h-7 bg-slate-900 rounded-lg overflow-hidden flex items-center p-1 relative">
                  <div
                    style={{ width: `${Math.max(5, barWidthPercent)}%` }}
                    className={`h-full rounded-md flex items-center justify-end px-2.5 transition-all duration-300 ${
                      isUK
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 shadow-md shadow-blue-500/30'
                        : 'bg-gradient-to-r from-slate-700 to-slate-600 group-hover:from-slate-600 group-hover:to-slate-500'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-white font-mono drop-shadow">
                      {value.toFixed(1)}%
                    </span>
                  </div>

                  {/* Benchmark Markers */}
                  {sortBy === 'spending' && (
                    <>
                      {/* OECD Avg Marker */}
                      <div 
                        style={{ left: `${(INTERNATIONAL_BENCHMARKS.oecdAverage / maxVal) * 100}%` }}
                        className="absolute top-0 bottom-0 w-0.5 bg-teal-400/50 pointer-events-none"
                        title="OECD Avg: 42.5%"
                      />
                      {/* G7 Avg Marker */}
                      <div 
                        style={{ left: `${(INTERNATIONAL_BENCHMARKS.g7Average / maxVal) * 100}%` }}
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-400/60 pointer-events-none"
                        title="G7 Avg: 46.2%"
                      />
                    </>
                  )}
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
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-teal-400"></span> OECD Avg (42.5%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-amber-400"></span> G7 Avg (46.2%)
            </span>
          </div>
          <span>Sources: IMF Fiscal Monitor, OECD National Accounts & HM Treasury OBR Outturn.</span>
        </div>
      </div>

      {/* Structural Fiscal Comparisons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Comparison 1: UK vs France */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>🇬🇧 UK vs 🇫🇷 France</span>
            <span className="text-red-400">France +14.0% higher</span>
          </div>
          <h4 className="text-sm font-bold text-white">The European High-Welfare Model</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            France's public sector (58.3% of GDP) is substantially larger than the UK's (44.3%). 
            France spends significantly more on municipal administration, early statutory retirement, and universal healthcare.
          </p>
        </div>

        {/* Comparison 2: UK vs Germany */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>🇬🇧 UK vs 🇩🇪 Germany</span>
            <span className="text-emerald-400">Germany 63.7% Debt</span>
          </div>
          <h4 className="text-sm font-bold text-white">The German Debt Brake Framework</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Germany spends 48.6% of GDP (higher than UK), but raises 46.1% in revenue, keeping its deficit low (-2.5%) 
            and total national debt at just 63.7% of GDP compared to the UK's 98.4%.
          </p>
        </div>

        {/* Comparison 3: UK vs United States */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>🇬🇧 UK vs 🇺🇸 United States</span>
            <span className="text-blue-400">UK +6.8% higher spending</span>
          </div>
          <h4 className="text-sm font-bold text-white">Single-Payer vs Market Healthcare</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            US federal + state public spending is 37.5% of GDP. Because much of US healthcare is privately funded 
            through employer health insurance, total government spending as a share of GDP appears lower than European systems.
          </p>
        </div>
      </div>

      {/* ENLARGED COUNTRY MODAL (When any country bar is selected) */}
      {selectedCountry && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
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
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      {selectedCountry.isG7 ? 'G7 Major Economy' : 'G20 Member'}
                    </span>
                    <span className="text-xs text-slate-400">({selectedCountry.region})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Official Fiscal Profile & Structural Breakdown
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

            {/* Modal Scrollable Body with Enlarged Graph */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Enlarged Visual Comparison Bar */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Enlarged Public Expenditure Comparison</span>
                  <span className="font-mono text-blue-400">{selectedCountry.spendingPercentGdp}% of GDP</span>
                </div>

                {/* Country Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{selectedCountry.country}</span>
                    <span className="font-mono font-bold text-white">{selectedCountry.spendingPercentGdp}%</span>
                  </div>
                  <div className="h-5 w-full bg-slate-900 rounded-lg overflow-hidden flex">
                    <div
                      style={{ width: `${(selectedCountry.spendingPercentGdp / 65) * 100}%` }}
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-lg"
                    />
                  </div>
                </div>

                {/* UK Benchmark Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>🇬🇧 United Kingdom (Benchmark)</span>
                    <span className="font-mono font-bold text-blue-400">{ukData.spendingPercentGdp}%</span>
                  </div>
                  <div className="h-5 w-full bg-slate-900 rounded-lg overflow-hidden flex">
                    <div
                      style={{ width: `${(ukData.spendingPercentGdp / 65) * 100}%` }}
                      className="h-full bg-blue-500 rounded-lg"
                    />
                  </div>
                </div>

                {/* G7 Average Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>G7 Economies Average</span>
                    <span className="font-mono font-bold text-amber-400">{INTERNATIONAL_BENCHMARKS.g7Average}%</span>
                  </div>
                  <div className="h-5 w-full bg-slate-900 rounded-lg overflow-hidden flex">
                    <div
                      style={{ width: `${(INTERNATIONAL_BENCHMARKS.g7Average / 65) * 100}%` }}
                      className="h-full bg-amber-500 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 4 Key Figures Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Public Expenditure</span>
                  <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">
                    {selectedCountry.spendingPercentGdp}%
                  </span>
                  <span className="text-[10px] text-slate-500">of GDP</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Government Revenue</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5 block">
                    {selectedCountry.revenuePercentGdp}%
                  </span>
                  <span className="text-[10px] text-slate-500">Taxes & receipts</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Annual Deficit</span>
                  <span className="text-xl font-extrabold text-rose-400 font-mono mt-0.5 block">
                    {selectedCountry.deficitPercentGdp}%
                  </span>
                  <span className="text-[10px] text-slate-500">Net borrowing</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Public Debt</span>
                  <span className="text-xl font-extrabold text-amber-400 font-mono mt-0.5 block">
                    {selectedCountry.debtPercentGdp}%
                  </span>
                  <span className="text-[10px] text-slate-500">of GDP</span>
                </div>
              </div>

              {/* Per Capita Spending */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Approximate Public Spending Per Resident</span>
                  <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                    £{selectedCountry.spendingPerCapitaGbp.toLocaleString()} / person / year
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <span>UK Equivalent:</span>
                  <div className="text-sm font-bold text-blue-400 font-mono">£17,980</div>
                </div>
              </div>

              {/* Structural Analysis */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-2">
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wide">
                  Economic & Fiscal Context:
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

