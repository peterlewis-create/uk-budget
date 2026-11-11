import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  Percent, 
  TrendingUp, 
  Coins, 
  PieChart, 
  Calendar,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  YEARLY_SPENDING_SPLITS, 
  YEARLY_REVENUE_SPLITS, 
  YearlySpendingSplit, 
  YearlyRevenueSplit 
} from '../data/ukBudgetData';

export const YearlySplitGraphs: React.FC = () => {
  const [splitMode, setSplitMode] = useState<'spending' | 'revenue'>('spending');
  const [displayFormat, setDisplayFormat] = useState<'absolute' | 'percentage'>('absolute');
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(YEARLY_SPENDING_SPLITS.length - 2); // default 2024/25
  const [highlightCategory, setHighlightCategory] = useState<string | null>(null);

  // Compare mode
  const [compareYearIndex1, setCompareYearIndex1] = useState<number>(0); // 2010/11
  const [compareYearIndex2, setCompareYearIndex2] = useState<number>(YEARLY_SPENDING_SPLITS.length - 2); // 2024/25

  const spendingCategories = [
    { key: 'welfare', label: 'Welfare & Pensions', color: '#3b82f6' },
    { key: 'health', label: 'Health & NHS', color: '#06b6d4' },
    { key: 'debtInterest', label: 'Debt Interest', color: '#ef4444' },
    { key: 'education', label: 'Education & Skills', color: '#8b5cf6' },
    { key: 'defence', label: 'Defence & Security', color: '#10b981' },
    { key: 'otherServices', label: 'Other Services & Capital', color: '#64748b' },
  ];

  const revenueCategories = [
    { key: 'incomeTax', label: 'Income Tax', color: '#3b82f6' },
    { key: 'nics', label: 'National Insurance', color: '#6366f1' },
    { key: 'vat', label: 'VAT (Consumption)', color: '#06b6d4' },
    { key: 'corpTax', label: 'Corporation Tax', color: '#8b5cf6' },
    { key: 'otherTaxes', label: 'Other Taxes & Levies', color: '#10b981' },
    { key: 'borrowing', label: 'Borrowing (Deficit)', color: '#ef4444' },
  ];

  const currentSpendingYear = YEARLY_SPENDING_SPLITS[selectedYearIndex];
  const currentRevenueYear = YEARLY_REVENUE_SPLITS[selectedYearIndex];

  const year1Spending = YEARLY_SPENDING_SPLITS[compareYearIndex1];
  const year2Spending = YEARLY_SPENDING_SPLITS[compareYearIndex2];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Controls Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            <BarChart3 className="w-3.5 h-3.5" />
            Annual Multi-Year Composition Analysis (2010–2026)
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            UK Budget Split Per Year: Spending & Revenue Over Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Analyze how the composition of British public expenditure and taxation has shifted over 15 years, 
            revealing the explosive growth in healthcare, state pensions, and debt servicing.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Spending vs Revenue Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSplitMode('spending')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                splitMode === 'spending' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Spending Split</span>
            </button>
            <button
              onClick={() => setSplitMode('revenue')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                splitMode === 'revenue' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Revenue Split</span>
            </button>
          </div>

          {/* Absolute (£bn) vs Percentage (%) Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setDisplayFormat('absolute')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                displayFormat === 'absolute' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              £ Billions
            </button>
            <button
              onClick={() => setDisplayFormat('percentage')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                displayFormat === 'percentage' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Percent className="w-3 h-3" />
              <span>100% Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stacked Graph Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              {splitMode === 'spending'
                ? `UK Public Expenditure Split per Year (${displayFormat === 'absolute' ? '£ Billions' : 'Percentage Share %'})`
                : `UK Receipts & Borrowing Split per Year (${displayFormat === 'absolute' ? '£ Billions' : 'Percentage Share %'})`}
            </h3>
            <p className="text-xs text-slate-400">
              Click any column to view the detailed table below. Click legend items to highlight specific categories.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Selected Year: <strong className="text-white font-mono">{splitMode === 'spending' ? currentSpendingYear.year : currentRevenueYear.year}</strong>
          </div>
        </div>

        {/* Legend Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {(splitMode === 'spending' ? spendingCategories : revenueCategories).map((cat) => {
            const isHighlighted = highlightCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setHighlightCategory(isHighlighted ? null : cat.key)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                  isHighlighted
                    ? 'bg-white/10 text-white border-white shadow-sm'
                    : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }}></span>
                <span>{cat.label}</span>
              </button>
            );
          })}
          {highlightCategory && (
            <button
              onClick={() => setHighlightCategory(null)}
              className="text-[11px] text-blue-400 hover:underline ml-auto"
            >
              Reset highlight
            </button>
          )}
        </div>

        {/* The Stacked Bar Graph Canvas */}
        <div className="w-full h-80 sm:h-96 bg-slate-950 rounded-xl p-4 sm:p-6 border border-slate-800 flex flex-col justify-end">
          <div className="w-full h-full flex items-end justify-between gap-1.5 sm:gap-3 pb-3">
            {(splitMode === 'spending' ? YEARLY_SPENDING_SPLITS : YEARLY_REVENUE_SPLITS).map((item, index) => {
              const isSelected = selectedYearIndex === index;
              const total = splitMode === 'spending' 
                ? (item as YearlySpendingSplit).totalSpending 
                : (item as YearlyRevenueSplit).totalReceiptsAndBorrowing;

              // Normalized bar height: if percentage format, total height is always 100%. If absolute, scaled against max ~£1,300bn.
              const barTotalHeightPercent = displayFormat === 'percentage' 
                ? 100 
                : (total / 1350) * 100;

              return (
                <div
                  key={item.year}
                  onClick={() => setSelectedYearIndex(index)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Floating tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-800 text-[11px] text-white px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none border border-slate-700 font-mono">
                    <strong className="text-blue-300">{item.year}</strong>: £{total.toFixed(1)}bn
                  </div>

                  {/* Stacked container */}
                  <div
                    style={{ height: `${barTotalHeightPercent}%` }}
                    className={`w-full flex flex-col-reverse rounded-t overflow-hidden transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-white brightness-110 shadow-lg' : 'hover:brightness-110 opacity-90'
                    }`}
                  >
                    {(splitMode === 'spending' ? spendingCategories : revenueCategories).map((cat) => {
                      const amount = (item as any)[cat.key] as number;
                      const segmentHeight = (amount / total) * 100;
                      const isCatDimmed = highlightCategory && highlightCategory !== cat.key;

                      return (
                        <div
                          key={cat.key}
                          style={{
                            height: `${segmentHeight}%`,
                            backgroundColor: cat.color,
                            opacity: isCatDimmed ? 0.2 : 1
                          }}
                          className="w-full transition-all duration-200"
                          title={`${cat.label}: £${amount.toFixed(1)}bn (${segmentHeight.toFixed(1)}%)`}
                        />
                      );
                    })}
                  </div>

                  {/* Year Label */}
                  <div className="mt-2 text-[9px] sm:text-[11px] text-slate-400 font-mono rotate-45 sm:rotate-0 origin-left truncate">
                    {item.year.split('/')[0].slice(-2)}/{item.year.split('/')[1]?.slice(0, 2) || ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Year Detailed Split Table */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Exact Yearly Split for Fiscal Year: <strong>{splitMode === 'spending' ? currentSpendingYear.year : currentRevenueYear.year}</strong></span>
              </h4>
              <span className="text-xs text-slate-400">
                Total: <strong className="text-white font-mono">£{(splitMode === 'spending' ? currentSpendingYear.totalSpending : currentRevenueYear.totalReceiptsAndBorrowing).toFixed(1)}bn</strong>
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Click any other year column on the graph to inspect
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {(splitMode === 'spending' ? spendingCategories : revenueCategories).map((cat) => {
              const currentItem = splitMode === 'spending' ? currentSpendingYear : currentRevenueYear;
              const amount = (currentItem as any)[cat.key] as number;
              const total = splitMode === 'spending' ? currentSpendingYear.totalSpending : currentRevenueYear.totalReceiptsAndBorrowing;
              const percentage = (amount / total) * 100;

              return (
                <div
                  key={cat.key}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="truncate">{cat.label}</span>
                  </div>
                  <div className="text-base font-extrabold text-white font-mono">
                    £{amount.toFixed(1)}bn
                  </div>
                  <div className="text-[11px] font-semibold" style={{ color: cat.color }}>
                    {percentage.toFixed(1)}% of total
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side-by-Side 15-Year Growth Comparison Tool */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Year-on-Year Departmental Shift Comparison
            </h3>
            <p className="text-xs text-slate-400">
              Compare any two fiscal years to identify structural shifts in UK state spending.
            </p>
          </div>

          {/* Year pickers */}
          <div className="flex items-center gap-2 text-xs">
            <select
              value={compareYearIndex1}
              onChange={(e) => setCompareYearIndex1(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 font-mono focus:outline-none focus:border-blue-500"
            >
              {YEARLY_SPENDING_SPLITS.map((y, idx) => (
                <option key={y.year} value={idx}>{y.year}</option>
              ))}
            </select>
            <span className="text-slate-400 font-bold">vs</span>
            <select
              value={compareYearIndex2}
              onChange={(e) => setCompareYearIndex2(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 font-mono focus:outline-none focus:border-blue-500"
            >
              {YEARLY_SPENDING_SPLITS.map((y, idx) => (
                <option key={y.year} value={idx}>{y.year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Spending Category</th>
                <th className="p-3">{year1Spending.year}</th>
                <th className="p-3">{year2Spending.year}</th>
                <th className="p-3">Absolute Change (£bn)</th>
                <th className="p-3 text-right">Growth Rate (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {spendingCategories.map((cat) => {
                const val1 = (year1Spending as any)[cat.key] as number;
                const val2 = (year2Spending as any)[cat.key] as number;
                const delta = val2 - val1;
                const growthPercent = ((val2 - val1) / val1) * 100;

                return (
                  <tr key={cat.key} className="hover:bg-slate-850 transition-colors">
                    <td className="p-3 font-sans font-medium text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }}></span>
                      {cat.label}
                    </td>
                    <td className="p-3">£{val1.toFixed(1)}bn</td>
                    <td className="p-3 text-white font-bold">£{val2.toFixed(1)}bn</td>
                    <td className={`p-3 font-bold ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {delta >= 0 ? `+£${delta.toFixed(1)}bn` : `-£${Math.abs(delta).toFixed(1)}bn`}
                    </td>
                    <td className={`p-3 text-right font-bold ${growthPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {growthPercent >= 0 ? `+${growthPercent.toFixed(1)}%` : `${growthPercent.toFixed(1)}%`}
                    </td>
                  </tr>
                );
              })}
              {/* Total Row */}
              <tr className="bg-slate-950/60 font-bold border-t-2 border-slate-800 text-white">
                <td className="p-3 font-sans">Total Public Spending</td>
                <td className="p-3">£{year1Spending.totalSpending.toFixed(1)}bn</td>
                <td className="p-3 text-blue-400">£{year2Spending.totalSpending.toFixed(1)}bn</td>
                <td className="p-3 text-blue-400">
                  +£{(year2Spending.totalSpending - year1Spending.totalSpending).toFixed(1)}bn
                </td>
                <td className="p-3 text-right text-blue-400">
                  +{(((year2Spending.totalSpending - year1Spending.totalSpending) / year1Spending.totalSpending) * 100).toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Commentary */}
        <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 space-y-1.5">
          <span className="font-bold text-blue-300 block">Key Takeaway from 15-Year Fiscal Shift:</span>
          <p className="leading-relaxed">
            Between 2010 and 2024, <strong className="text-white">Public Debt Interest</strong> surged by over <strong className="text-red-400">+125%</strong> (from £45.3bn to £102.3bn), 
            and <strong className="text-white">Health & Social Care</strong> surged by <strong className="text-cyan-400">+74%</strong> (from £121.5bn to £211.4bn). 
            In contrast, discretionary areas like Education (+3.8%) and Defence (+36%) experienced much slower growth or real-terms freezes.
          </p>
        </div>
      </div>
    </div>
  );
};
