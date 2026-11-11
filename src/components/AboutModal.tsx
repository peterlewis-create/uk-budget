import React from 'react';
import { X, ExternalLink, Database, ShieldCheck, BookOpen, Scale } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">About the UK Budget Explorer</h3>
              <p className="text-xs text-slate-400">Data Sources, Methodologies & Fiscal Framework</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Primary Official Data Sources
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              This application is built using primary verified datasets published by the UK Government and sovereign fiscal watchdogs:
            </p>
            <ul className="space-y-2">
              <li className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <strong className="text-white block text-xs">Office for Budget Responsibility (OBR)</strong>
                  <span className="text-[11px] text-slate-400">Economic and Fiscal Outlook (EFO), Public Finances Databank, and Fiscal Risks Report.</span>
                </div>
                <a href="https://obr.uk" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <strong className="text-white block text-xs">HM Treasury (HMT)</strong>
                  <span className="text-[11px] text-slate-400">Autumn Budget Statement, Public Expenditure Statistical Analyses (PESA), and Main Supply Estimates.</span>
                </div>
                <a href="https://www.gov.uk/government/organisations/hm-treasury" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <strong className="text-white block text-xs">Office for National Statistics (ONS)</strong>
                  <span className="text-[11px] text-slate-400">Public Sector Finances Statistical Bulletins and Gross Domestic Product outturn.</span>
                </div>
                <a href="https://www.ons.gov.uk" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              Tax Calculation & Allocation Methodology
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs leading-relaxed text-slate-400">
              <p>
                <strong>Income Tax & NICs:</strong> Calculations reflect standard rates for England, Wales & Northern Ireland for tax year 2024/25. 
                Personal Allowance is £12,570, tapering by £1 for every £2 of income above £100,000. Employee National Insurance is charged at 8% on earnings between £12,570 and £50,270, and 2% thereafter.
              </p>
              <p>
                <strong>"Where My Tax Goes":</strong> Total direct personal tax is apportioned across public spending functions based on their share of Total Managed Expenditure (TME). 
                Because taxes pool into the Consolidated Fund and National Insurance Fund, individual payments fund all public services proportionately.
              </p>
              <p>
                <strong>Policy Simulation Levers:</strong> Elasticity coefficients are derived from HMRC "Direct effects of illustrative tax changes" tables and OBR fiscal multipliers, accounting for behavioral drag.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

