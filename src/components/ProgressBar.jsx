import React from 'react';
import { Icons } from './Icons';

export default function ProgressBar({ currentStep, setStep, steps, completionPercentage }) {
  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 mb-6 sm:mb-8 izeon-card-shadow">
      {/* Top summary row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#0b5aa5]">
            Client Brief Flow
          </span>
          <h2 className="text-sm sm:text-lg font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2">
            <span>Step {currentStep} of {steps.length}:</span>
            <span className="text-[#0b5aa5] font-bold">{steps[currentStep - 1]?.title}</span>
          </h2>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <div className="text-xs font-bold text-slate-800">
              Readiness: <span className="text-[#0b5aa5] font-extrabold">{completionPercentage}%</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
              {completionPercentage >= 80 ? '✓ Ready for WhatsApp' : completionPercentage >= 50 ? '⚡ Good progress' : '📝 Fill details'}
            </div>
          </div>
          <div className="w-20 sm:w-24 h-2 sm:h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <div 
              className="h-full bg-gradient-to-r from-[#0b5aa5] to-[#147fd9] transition-all duration-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Steps Navigation: Horizontal scroll on mobile, clean grid on tablet/desktop */}
      <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2.5 border-t border-slate-100 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {steps.map((s, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isPassed = currentStep > stepNum;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(stepNum)}
              className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl text-left transition duration-150 cursor-pointer shrink-0 min-w-[125px] sm:min-w-0 ${
                isActive
                  ? 'bg-[#0b5aa5] text-white shadow-md shadow-[#0b5aa5]/25 font-bold'
                  : isPassed
                  ? 'bg-blue-50/80 hover:bg-blue-100/80 text-[#0b5aa5] border border-blue-100/90 font-semibold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-transparent font-medium'
              }`}
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition ${
                  isActive
                    ? 'bg-white text-[#0b5aa5]'
                    : isPassed
                    ? 'bg-[#0b5aa5] text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isPassed ? (
                  <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  stepNum
                )}
              </div>
              <div className="truncate">
                <div className="text-xs truncate">
                  {s.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
