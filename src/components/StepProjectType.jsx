import React from 'react';
import { PROJECT_TYPES, PAGE_COUNTS } from '../data/presetData';
import { Icons } from './Icons';

export default function StepProjectType({ formData, updateField, onNext, onBack }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Step Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#0b5aa5] text-xs font-bold border border-blue-100 mb-2">
          <Icons.Layers className="w-3.5 h-3.5" />
          <span>Step 2: Project Architecture</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          What type of digital product do you want?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Select the core foundation that matches your application requirements.
        </p>
      </div>

      {/* Project Type Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {PROJECT_TYPES.map((type) => {
          const isSelected = formData.projectType === type.id;
          const IconComp = Icons[type.icon] || Icons.Globe;

          return (
            <div
              key={type.id}
              onClick={() => {
                updateField('projectType', type.id);
                if (!formData.pageCount) {
                  updateField('pageCount', type.defaultPages);
                }
              }}
              className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all duration-150 relative group flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/70 border-[#0b5aa5] ring-2 ring-[#0b5aa5]/20 shadow-md'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition ${
                    isSelected 
                      ? 'bg-[#0b5aa5] text-white shadow-xs' 
                      : 'bg-blue-50 text-[#0b5aa5]'
                  }`}>
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                    isSelected 
                      ? 'bg-[#0b5aa5] text-white' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {type.badge}
                  </span>
                </div>

                <h3 className={`text-sm sm:text-base font-bold mb-1 ${isSelected ? 'text-[#0b5aa5]' : 'text-slate-900'}`}>
                  {type.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {type.description}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Standard Scope:</span>
                <span className="text-[#0b5aa5] font-bold">{type.defaultPages}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scope / Page Count Selection */}
      <div className="pt-3 sm:pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Estimated Number of Screens / Pages Needed
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PAGE_COUNTS.map((p) => {
            const isSelected = formData.pageCount === p.label;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => updateField('pageCount', p.label)}
                className={`p-2.5 sm:p-3 rounded-xl text-left border text-xs transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-[#0b5aa5] text-[#0b5aa5] font-bold shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 font-medium'
                }`}
              >
                <span>{p.label}</span>
                {isSelected && <Icons.Check className="w-4 h-4 text-[#0b5aa5] shrink-0 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wizard Navigation */}
      {(onNext || onBack) && (
        <div className="pt-3 sm:pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5 border-t border-slate-100">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Icons.ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div className="hidden sm:block"></div>}

          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0b5aa5] hover:bg-[#094c8c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0b5aa5]/25 transition cursor-pointer group"
            >
              <span>Continue to Features</span>
              <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
