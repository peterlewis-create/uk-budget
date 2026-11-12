import React, { useState } from 'react';
import { 
  LineChart, 
  TrendingUp, 
  Calendar, 
  Clock, 
  BarChart3,
  Flame,
  ArrowRight
} from 'lucide-react';
import { UK_HISTORICAL_DATA, HistoricalYearData } from '../data/ukBudgetData';
import { DebtInterestTicker } from './DebtInterestTicker';
import { YearlySplitGraphs } from './YearlySplitGraphs';

export const HistoricalTab: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'debt' | 'spending_vs_receipts' | 'borrowing' | 'macro'>('debt');
  const [activeYear, setActiveYear] = useState<HistoricalYearData>(UK_HISTORICAL_DATA[UK_HISTORICAL_DATA.length - 2]); // 2024/25
  const [showYearlySplits, setShowYearlySplits] = useState(true);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Quarter-Century Fiscal History & Split Analysis (2000–2026)
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            How UK Debt & Public Spending Surged from 30% to 98% of GDP
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Recent 2020/21–2025/26 ONS spending, receipts, borrowing and debt have been updated; earlier fiscal figures and some macro-economic fields remain under source review. Tracking economic shocks: 
            the Dot-com surplus, the 2008 Financial Crisis, Austerity, the COVID-19 pandemic, and recent inflation.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setSelectedMetric('debt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedMetric === 'debt' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Debt (% GDP)
          </button>
          <button
            onClick={() => setSelectedMetric('spending_vs_receipts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedMetric === 'spending_vs_receipts' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Spend vs Tax (£bn)
          </button>
          <button
            onClick={() => setSelectedMetric('borrowing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedMetric === 'borrowing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual Deficit
          </button>
          <button
            onClick={() => setSelectedMetric('macro')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedMetric === 'macro' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Inflation & Rate
          </button>
        </div>
      </div>

      {/* Real-Time Debt Interest Counter Widget */}
      <DebtInterestTicker variant="compact" />

      {/* Interactive Visual SVG Chart */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-400" />
            {selectedMetric === 'debt' && 'Public Sector Net Debt as % of Gross Domestic Product (2000 - 2026)'}
            {selectedMetric === 'spending_vs_receipts' && 'Total Managed Expenditure vs Total Receipts (£ Billions)'}
            {selectedMetric === 'borrowing' && 'Annual Public Sector Net Borrowing / Deficit (£ Billions)'}
            {selectedMetric === 'macro' && 'CPI Inflation Rate vs Bank of England Base Interest Rate (%)'}
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Click any column point to inspect fiscal data
          </span>
        </div>

        {/* Custom Interactive SVG Chart Component */}
        <div className="w-full h-72 sm:h-80 bg-slate-950 rounded-xl p-4 border border-slate-800 relative flex flex-col justify-end">
          {/* SVG Canvas */}
          <div className="w-full h-full flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2">
            {UK_HISTORICAL_DATA.map((item) => {
              let barHeight = 0;
              let label = '';
              let barColor = '#3b82f6';

              if (selectedMetric === 'debt') {
                barHeight = (item.debtPercentGdp / 110) * 100;
                label = `${item.debtPercentGdp.toFixed(1)}%`;
                barColor = item.debtPercentGdp > 90 ? '#f59e0b' : item.debtPercentGdp > 60 ? '#3b82f6' : '#10b981';
              } else if (selectedMetric === 'spending_vs_receipts') {
                barHeight = (item.spending / 1350) * 100;
                label = `£${item.spending.toFixed(0)}bn`;
                barColor = '#6366f1';
              } else if (selectedMetric === 'borrowing') {
                const normVal = Math.max(0, item.borrowing);
                barHeight = (normVal / 330) * 100;
                label = `£${item.borrowing.toFixed(0)}bn`;
                barColor = item.borrowing > 150 ? '#ef4444' : item.borrowing > 80 ? '#f97316' : item.borrowing < 0 ? '#10b981' : '#3b82f6';
              } else if (selectedMetric === 'macro') {
                barHeight = (Math.max(0, item.inflation) / 10) * 100;
                label = `${item.inflation.toFixed(1)}%`;
                barColor = item.inflation > 5 ? '#ef4444' : '#14b8a6';
              }

              const isSelected = activeYear.year === item.year;

              return (
                <div
                  key={item.year}
                  onClick={() => setActiveYear(item)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Floating tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-800 text-[10px] text-white px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none border border-slate-700">
                    {item.year}: {label}
                  </div>

                  {/* The bar element */}
                  <div
                    style={{ height: `${Math.max(8, barHeight)}%`, backgroundColor: barColor }}
                    className={`w-full rounded-t transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-white brightness-125' : 'hover:brightness-110 opacity-80'
                    }`}
                  />

                  {/* Year label underneath */}
                  <div className="mt-2 text-[9px] sm:text-[10px] text-slate-400 rotate-45 sm:rotate-0 origin-left truncate">
                    {item.year.split('/')[0].slice(-2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Year Detail Callout */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">Year {activeYear.year}</span>
              {activeYear.keyEvent && (
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-medium">
                  {activeYear.keyEvent}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
              <span>Public Spending: <strong className="text-white">£{activeYear.spending}bn</strong></span>
              <span>Receipts: <strong className="text-white">£{activeYear.receipts}bn</strong></span>
              <span>Deficit: <strong className={activeYear.borrowing < 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {activeYear.borrowing < 0 ? `£${Math.abs(activeYear.borrowing)}bn Surplus` : `£${activeYear.borrowing}bn`}
              </strong></span>
              <span>Debt: <strong className="text-amber-400">{activeYear.debtPercentGdp}% GDP (£{activeYear.debtAmount}bn)</strong></span>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 shrink-0">
            <div>Inflation: <strong className="text-slate-200">{activeYear.inflation}%</strong></div>
            <div>Bank Rate: <strong className="text-slate-200">{activeYear.bankRate}%</strong></div>
          </div>
        </div>
      </div>

      {/* Embedded Yearly Splits Section */}
      <div className="pt-4 border-t border-slate-800/80">
        <YearlySplitGraphs />
      </div>

      {/* Historical Milestones Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          Key Turning Points in Modern British Public Finances
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Milestone 1: 2000 Dotcom Surplus */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>2000 - 2001</span>
              <span>£16.6bn Surplus</span>
            </div>
            <h4 className="text-sm font-bold text-white">The Millennial Budget Surplus</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buoyed by strong economic growth and 3G telecoms spectrum auction receipts (£22.5bn), 
              the UK government ran a cash budget surplus. National debt was just 30.6% of GDP.
            </p>
          </div>

          {/* Milestone 2: 2008 Crash */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-rose-400">
              <span>2008 - 2010</span>
              <span>10.1% GDP Deficit</span>
            </div>
            <h4 className="text-sm font-bold text-white">The Global Financial Crisis</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Catastrophic banking collapses led to massive taxpayer bailouts of RBS and HBOS. 
              Tax receipts plunged while automatic welfare stabilizers triggered, pushing debt from 35% past 65% of GDP.
            </p>
          </div>

          {/* Milestone 3: 2020 Pandemic & Today */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>2020 - Present</span>
              <span>£313bn Peak Borrowing</span>
            </div>
            <h4 className="text-sm font-bold text-white">COVID Shock & Inflation Surge</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lockdown support (Coronavirus Job Retention Scheme, business loans, NHS PPE) caused borrowing to reach 
              peacetime records. Subsequent global energy price shocks drove debt to 98.4% of GDP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
