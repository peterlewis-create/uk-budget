import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  HeartPulse, 
  GraduationCap, 
  Briefcase, 
  Coins, 
  Activity,
  Calendar,
  Sparkles
} from 'lucide-react';
import { DEBT_INTEREST_METRICS, UK_FISCAL_TOTALS } from '../data/ukBudgetData';

interface DebtInterestTickerProps {
  variant?: 'full' | 'compact' | 'mini';
}

export const DebtInterestTicker: React.FC<DebtInterestTickerProps> = ({ variant = 'full' }) => {
  // Session start time
  const startTimeRef = useRef<number>(Date.now());
  const [sessionInterest, setSessionInterest] = useState<number>(0);
  const [todayInterest, setTodayInterest] = useState<number>(0);
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);

  useEffect(() => {
    const updateInterest = () => {
      const now = Date.now();
      const elapsedSeconds = (now - startTimeRef.current) / 1000;
      setSessionSeconds(elapsedSeconds);
      setSessionInterest(elapsedSeconds * DEBT_INTEREST_METRICS.perSecond);

      // Calculate elapsed seconds since midnight today (UK local time)
      const date = new Date(now);
      const midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      const secondsSinceMidnight = (now - midnight) / 1000;
      setTodayInterest(secondsSinceMidnight * DEBT_INTEREST_METRICS.perSecond);
    };

    updateInterest();
    const timer = setInterval(updateInterest, 50); // High precision 20fps ticker
    return () => clearInterval(timer);
  }, []);

  const formatPounds = (val: number, decimals: number = 2) => {
    return val.toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // Mini variant for sticky header
  if (variant === 'mini') {
    return (
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-xs font-mono">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-slate-400 font-sans text-[11px] hidden sm:inline">Debt Interest:</span>
        <span className="text-red-400 font-bold">+£{formatPounds(sessionInterest, 0)}</span>
        <span className="text-slate-500 text-[10px]">({sessionSeconds.toFixed(0)}s on page)</span>
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-900/40 shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 animate-pulse text-red-500" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <span>Real-Time Debt Interest Counter</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
              £{formatPounds(todayInterest, 0)} <span className="text-xs font-sans text-slate-400">today so far</span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs text-red-400 font-bold font-mono">
            +£{DEBT_INTEREST_METRICS.perSecond.toLocaleString('en-GB', { minimumFractionDigits: 2 })} / sec
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            +£{formatPounds(sessionInterest, 2)} this session
          </div>
        </div>
      </div>
    );
  }

  // Full detailed variant
  const medianSalariesToday = todayInterest / DEBT_INTEREST_METRICS.medianWorkerAnnualSalary;
  const nursesToday = todayInterest / DEBT_INTEREST_METRICS.nhsNurseAnnualSalary;
  const hipOpsToday = todayInterest / DEBT_INTEREST_METRICS.nhsHipReplacementCost;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-red-950/50 via-slate-900 to-slate-950 border border-red-900/50 shadow-2xl p-6 sm:p-7 space-y-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 animate-pulse text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white tracking-tight">
                Live UK Public Debt Interest Ticker
              </h3>
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
                Real-Time Outflow
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              HM Treasury debt servicing on UK sovereign gilts and inflation-linked liabilities (£102.3bn/year)
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[11px] text-slate-400 block font-medium">Burn Rate Every Second</span>
          <span className="text-lg font-extrabold text-red-400 font-mono">
            +£{DEBT_INTEREST_METRICS.perSecond.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / sec
          </span>
        </div>
      </div>

      {/* Primary Counters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Today's Interest So Far */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-red-900/30 shadow-inner">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Interest Paid Today (Since Midnight)</span>
            <Clock className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight text-red-400">
            £{formatPounds(todayInterest, 2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Paces to</span>
            <strong className="text-slate-200">£280.1m</strong>
            <span>by 23:59:59 tonight</span>
          </div>
        </div>

        {/* Accrued While On Page */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Accrued While You've Viewed Page</span>
            <Activity className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
            +£{formatPounds(sessionInterest, 2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Timer: <span className="font-mono text-slate-200">{sessionSeconds.toFixed(1)} seconds</span> elapsed
          </div>
        </div>

        {/* Annual Total */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Annual Debt Servicing</span>
            <Coins className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            £102.3bn
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            8.3% of entire government budget
          </div>
        </div>
      </div>

      {/* Burn Rate Velocity Scale */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-red-400" />
          Standard Debt Servicing Velocity:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Every Second</span>
            <span className="text-sm font-bold text-red-400 font-mono">£3,241.65</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Every Minute</span>
            <span className="text-sm font-bold text-amber-400 font-mono">£194,500</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Every Hour</span>
            <span className="text-sm font-bold text-slate-200 font-mono">£11.67 Million</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Every 24 Hours</span>
            <span className="text-sm font-bold text-slate-200 font-mono">£280.1 Million</span>
          </div>
        </div>
      </div>

      {/* Real-World Equivalents: What That Money Could Have Bought Today */}
      <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-red-300 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            What Today's Debt Interest Paid So Far Could Have Funded:
          </span>
          <span className="text-[11px] text-slate-400">Live updated</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Equivalent 1: Nurses */}
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-mono">
                {Math.floor(nursesToday).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                NHS Nurse Annual Salaries (£38,000/yr)
              </div>
            </div>
          </div>

          {/* Equivalent 2: Worker annual salaries */}
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-mono">
                {Math.floor(medianSalariesToday).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                Median UK Worker Yearly Wages (£37.5k)
              </div>
            </div>
          </div>

          {/* Equivalent 3: Hip replacements */}
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-mono">
                {Math.floor(hipOpsToday).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                NHS Hip Replacement Operations (£8,000)
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
          <strong className="text-slate-300">Why is this so high?</strong> Approximately 25% of the UK's £2.7 Trillion national debt 
          is index-linked to Retail Price Index (RPI) inflation. When inflation surged between 2022 and 2024, sovereign interest payouts 
          spiked past £100bn per year, where they remain elevated due to higher global interest rates.
        </p>
      </div>
    </div>
  );
};
