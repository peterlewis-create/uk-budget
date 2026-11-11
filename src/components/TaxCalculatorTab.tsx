import React, { useState } from 'react';
import { 
  Receipt, 
  PoundSterling, 
  ArrowRight, 
  Share2, 
  Download, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  Percent
} from 'lucide-react';
import { calculatePersonalTax, UK_FISCAL_TOTALS } from '../data/ukBudgetData';
import { IconHelper } from './IconHelper';

export const TaxCalculatorTab: React.FC = () => {
  const [salary, setSalary] = useState<number>(37500);
  const [timeframe, setTimeframe] = useState<'annual' | 'monthly' | 'daily'>('annual');

  const presets = [
    { label: 'Living Wage', value: 23795, desc: 'Full-time minimum wage' },
    { label: 'UK Median', value: 37500, desc: 'Average full-time worker' },
    { label: 'Nurse / Teacher', value: 43000, desc: 'Public service mid-career' },
    { label: 'Higher Rate', value: 50270, desc: '40% tax threshold' },
    { label: 'Manager / Tech', value: 75000, desc: 'Top 15% UK income' },
    { label: '£100k Club', value: 100000, desc: 'Allowance taper zone' }
  ];

  const taxDetails = calculatePersonalTax(salary);

  const formatCurrency = (val: number) => {
    if (timeframe === 'annual') return `£${Math.round(val).toLocaleString()}`;
    if (timeframe === 'monthly') return `£${(val / 12).toFixed(2)}`;
    return `£${(val / 365).toFixed(2)}`;
  };

  const getSubTitle = () => {
    if (timeframe === 'annual') return 'Per Year';
    if (timeframe === 'monthly') return 'Per Month';
    return 'Per Day';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-2">
            <Receipt className="w-3.5 h-3.5" />
            Personal Tax Breakdown Engine (2024/25)
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Where Does Your Tax Money Actually Go?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Enter your gross annual salary to see your exact Income Tax, National Insurance contributions, 
            and an itemized receipt showing how many pounds and pence fund the NHS, State Pensions, Defence, and more.
          </p>
        </div>

        {/* Timeframe switch */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setTimeframe('annual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              timeframe === 'annual' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              timeframe === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe('daily')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              timeframe === 'daily' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily
          </button>
        </div>
      </div>

      {/* Salary Input & Preset Selection */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Select or Enter Your Annual Gross Salary (GBP):
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">£</span>
              <input
                type="number"
                min="0"
                max="500000"
                step="500"
                value={salary}
                onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            {/* Range Slider */}
            <input
              type="range"
              min="12000"
              max="150000"
              step="500"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-2">
            Quick Benchmarks:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => setSalary(p.value)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  salary === p.value
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{p.label}</div>
                <div className="text-xs font-mono text-blue-400">£{p.value.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500 truncate">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Salary */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Gross Annual Salary</div>
          <div className="text-2xl font-bold text-white mt-1">
            {formatCurrency(salary)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Personal Allowance: £{taxDetails.personalAllowance.toLocaleString()}
          </div>
        </div>

        {/* Income Tax */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Income Tax Paid</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">
            {formatCurrency(taxDetails.incomeTax)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            HMRC PAYE deduction
          </div>
        </div>

        {/* National Insurance */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Employee National Insurance</div>
          <div className="text-2xl font-bold text-indigo-400 mt-1">
            {formatCurrency(taxDetails.nic)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Class 1 NICs (8% rate)
          </div>
        </div>

        {/* Take Home Pay */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950/30 border border-emerald-900/50">
          <div className="text-xs text-slate-400 font-medium">Estimated Take-Home Pay</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {formatCurrency(taxDetails.netTakeHome)}
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-1">
            Effective Direct Tax Rate: {taxDetails.effectiveRate.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* The Official Itemized "Tax Receipt" Card */}
      <div className="max-w-3xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden font-sans">
        {/* Receipt Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 text-center space-y-1 relative">
          <div className="inline-block p-2 rounded-xl bg-slate-900 border border-slate-800 mb-2">
            <span className="text-2xl">🏛️</span>
          </div>
          <h3 className="text-lg font-black text-white tracking-wide uppercase">
            Official UK Tax Contribution Receipt
          </h3>
          <p className="text-xs text-slate-400">
            HM Revenue & Customs / HM Treasury • Fiscal Year 2024/25
          </p>
          <div className="pt-2 flex justify-center items-center gap-3 text-xs text-slate-300 font-mono">
            <span>Gross: £{salary.toLocaleString()}</span>
            <span>•</span>
            <span className="text-emerald-400">Total Tax: {formatCurrency(taxDetails.totalDirectTax)}</span>
            <span>•</span>
            <span className="text-amber-400">{getSubTitle()}</span>
          </div>
        </div>

        {/* Itemized Line Items */}
        <div className="p-6 divide-y divide-slate-800/80 space-y-3">
          <div className="flex justify-between text-xs uppercase font-bold text-slate-400 pb-2">
            <span>Public Service / Department</span>
            <span className="text-right">Your Contribution ({getSubTitle()})</span>
          </div>

          {taxDetails.taxDistribution.map((item) => {
            const amount = timeframe === 'annual' ? item.amount : timeframe === 'monthly' ? item.monthly : item.daily;
            return (
              <div key={item.id} className="pt-3 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    <IconHelper name={item.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </span>
                    <div className="text-[11px] text-slate-500">
                      {item.percentage.toFixed(1)}% of total UK expenditure
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs sm:text-sm font-bold text-white font-mono">
                    {timeframe === 'annual' ? `£${item.amount.toFixed(2)}` : `£${amount.toFixed(2)}`}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {timeframe === 'annual' ? `£${(item.amount / 12).toFixed(1)}/mo` : `£${item.amount.toFixed(0)}/yr`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Receipt Footer */}
        <div className="bg-slate-950 p-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span className="font-semibold text-slate-200">Thank you for funding the United Kingdom.</span><br />
            Calculated proportionally using HM Treasury Autumn Budget & OBR outturn data.
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print / Save Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
