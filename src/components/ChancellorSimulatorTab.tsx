import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  HelpCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { 
  POLICY_LEVERS, 
  UK_FISCAL_TOTALS, 
  PolicyLever 
} from '../data/ukBudgetData';

export const ChancellorSimulatorTab: React.FC = () => {
  // State for all lever values
  const [leverValues, setLeverValues] = useState<{ [id: string]: number }>(() => {
    const initial: { [id: string]: number } = {};
    POLICY_LEVERS.forEach(l => {
      initial[l.id] = l.baselineValue;
    });
    return initial;
  });

  const handleSliderChange = (id: string, value: number) => {
    setLeverValues(prev => ({ ...prev, [id]: value }));
  };

  const resetToBaseline = () => {
    const initial: { [id: string]: number } = {};
    POLICY_LEVERS.forEach(l => {
      initial[l.id] = l.baselineValue;
    });
    setLeverValues(initial);
  };

  // Preset scenarios
  const applyScenario = (type: 'growth' | 'public_services' | 'balanced' | 'austerity') => {
    const next = { ...leverValues };
    if (type === 'public_services') {
      next['nhs-funding-change'] = 5; // +5% NHS
      next['defence-gdp-target'] = 2.5; // Defence to 2.5% GDP
      next['education-school-funding'] = 4; // +4% Schools
      next['income-tax-higher'] = 42; // +2p on higher rate
      next['corp-tax-rate'] = 26; // +1% Corp Tax
      next['employer-nic'] = 15;
    } else if (type === 'growth') {
      next['income-tax-basic'] = 19; // -1p basic rate
      next['corp-tax-rate'] = 22; // -3% corp tax
      next['fuel-duty-escalator'] = -2; // -2p fuel cut
      next['employer-nic'] = 13.8; // cut employer NIC
      next['nhs-funding-change'] = 0;
      next['defence-gdp-target'] = 2.3;
    } else if (type === 'balanced') {
      // Close the £87bn deficit!
      next['income-tax-basic'] = 22; // +2p
      next['vat-rate'] = 22; // +2%
      next['corp-tax-rate'] = 27; // +2%
      next['employer-nic'] = 16; // +1%
      next['state-pension-policy'] = -3; // slight moderation
      next['fuel-duty-escalator'] = 5; // unfreeze fuel duty
    } else if (type === 'austerity') {
      next['nhs-funding-change'] = -3;
      next['education-school-funding'] = -3;
      next['state-pension-policy'] = -5;
      next['defence-gdp-target'] = 2.0;
      next['income-tax-basic'] = 20;
    }
    setLeverValues(next);
  };

  // Calculate net fiscal balance delta
  let netFiscalDelta = 0; // positive = deficit decreases (revenue up / spending down)
  POLICY_LEVERS.forEach(lever => {
    const currentVal = leverValues[lever.id] ?? lever.baselineValue;
    const delta = currentVal - lever.baselineValue;
    netFiscalDelta += delta * lever.sensitivityPerUnit;
  });

  // Calculate new borrowing and debt metrics
  const baselineBorrowing = UK_FISCAL_TOTALS.netBorrowing; // £87.2bn
  const newBorrowing = Math.max(0, baselineBorrowing - netFiscalDelta);
  const newBorrowingPercentGdp = (newBorrowing / UK_FISCAL_TOTALS.gdp) * 100;
  const isSurplus = (baselineBorrowing - netFiscalDelta) < 0;
  const surplusAmount = Math.abs(baselineBorrowing - netFiscalDelta);

  const passesFiscalRule = newBorrowingPercentGdp <= 3.0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Chancellor Red Box Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border border-red-900/40 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
              <span className="text-base">💼</span>
              HM Treasury • Chancellor for a Day
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Design the Next UK National Budget
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Step into 11 Downing Street. Adjust key tax rates, NHS funding, defence spending, and welfare policies. 
              The live fiscal simulator models real-time revenue elasticities and evaluates whether your Budget complies with the OBR Fiscal Rules.
            </p>
          </div>

          {/* Quick Scenario Preset Buttons */}
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block w-full lg:w-auto">
              Simulate Policy Scenarios:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyScenario('public_services')}
                className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs font-semibold border border-blue-500/40 transition-colors"
              >
                Public Services Boost
              </button>
              <button
                onClick={() => applyScenario('growth')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 text-xs font-semibold border border-emerald-500/40 transition-colors"
              >
                Tax Cut Stimulus
              </button>
              <button
                onClick={() => applyScenario('balanced')}
                className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600 text-amber-200 text-xs font-semibold border border-amber-500/40 transition-colors"
              >
                Balanced Budget
              </button>
              <button
                onClick={resetToBaseline}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chancellor Fiscal Scorecard */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Live Fiscal Balance & Headroom Scorecard
            </h3>
            <p className="text-xs text-slate-400">
              Real-time impact of your policy choices compared to the current OBR baseline.
            </p>
          </div>

          {/* Fiscal Rule Compliance Pill */}
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${
            passesFiscalRule
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            {passesFiscalRule ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Complies with OBR Deficit Rule (&le;3% GDP)</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Exceeds OBR Deficit Rule (&gt;3% GDP)</span>
              </>
            )}
          </div>
        </div>

        {/* 3 Metrics: Net Policy Delta, New Borrowing, % of GDP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Net Fiscal Delta */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Net Policy Impact</div>
            <div className={`text-2xl font-black mt-1 ${netFiscalDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {netFiscalDelta >= 0 ? `+£${netFiscalDelta.toFixed(1)}bn` : `-£${Math.abs(netFiscalDelta).toFixed(1)}bn`}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {netFiscalDelta >= 0 ? 'Budget improvement (deficit reduced)' : 'Net cost / borrowing increased'}
            </div>
          </div>

          {/* New Annual Borrowing */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">
              {isSurplus ? 'Budget Surplus' : 'New Annual Borrowing'}
            </div>
            <div className={`text-2xl font-black mt-1 ${isSurplus ? 'text-emerald-400' : newBorrowing < baselineBorrowing ? 'text-blue-400' : 'text-rose-400'}`}>
              {isSurplus ? `£${surplusAmount.toFixed(1)}bn Surplus` : `£${newBorrowing.toFixed(1)}bn`}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Baseline: £{baselineBorrowing.toFixed(1)}bn
            </div>
          </div>

          {/* Borrowing % of GDP */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Deficit as % of GDP</div>
            <div className={`text-2xl font-black mt-1 ${passesFiscalRule ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isSurplus ? '0.0% (Surplus)' : `${newBorrowingPercentGdp.toFixed(2)}%`}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Baseline: {UK_FISCAL_TOTALS.borrowingPercentGdp}% • Target: &lt;3.0%
            </div>
          </div>
        </div>
      </div>

      {/* Policy Levers Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Interactive Budget Levers</h3>
            <p className="text-xs text-slate-400">Drag sliders to adjust tax rates and department allocations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POLICY_LEVERS.map((lever) => {
            const currentValue = leverValues[lever.id] ?? lever.baselineValue;
            const delta = currentValue - lever.baselineValue;
            const leverImpact = delta * lever.sensitivityPerUnit;

            return (
              <div
                key={lever.id}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-md space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      lever.category === 'Taxation'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {lever.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{lever.name}</h4>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-white font-mono">
                      {currentValue} {lever.unit}
                    </div>
                    <div className={`text-xs font-semibold ${
                      leverImpact > 0.05
                        ? 'text-emerald-400'
                        : leverImpact < -0.05
                        ? 'text-rose-400'
                        : 'text-slate-500'
                    }`}>
                      {leverImpact > 0.05 ? `+£${leverImpact.toFixed(1)}bn` : leverImpact < -0.05 ? `-£${Math.abs(leverImpact).toFixed(1)}bn` : '£0.0bn (Baseline)'}
                    </div>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min={lever.min}
                    max={lever.max}
                    step={lever.step}
                    value={currentValue}
                    onChange={(e) => handleSliderChange(lever.id, Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>{lever.min}{lever.unit}</span>
                    <span className="text-slate-400">Baseline: {lever.baselineValue}{lever.unit}</span>
                    <span>{lever.max}{lever.unit}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {lever.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

