import React from 'react';
import { DESIGN_STYLES, BRAND_STATUS } from '../data/presetData';
import { Icons } from './Icons';

export default function StepDesignVibe({ formData, updateField, onNext, onBack }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Step Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#0b5aa5] text-xs font-bold border border-blue-100 mb-2">
          <Icons.Palette className="w-3.5 h-3.5" />
          <span>Step 4: Aesthetics & Brand Identity</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          How should your site look and feel?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Define the visual personality and share your existing assets or inspiration benchmarks.
        </p>
      </div>

      {/* Visual Mood Options */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select Visual Style & Vibe
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {DESIGN_STYLES.map((style) => {
            const isSelected = formData.designStyle === style.id;
            return (
              <div
                key={style.id}
                onClick={() => updateField('designStyle', style.id)}
                className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/70 border-[#0b5aa5] ring-2 ring-[#0b5aa5]/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${isSelected ? 'text-[#0b5aa5]' : 'text-slate-900'}`}>
                      {style.title}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#0b5aa5] text-white flex items-center justify-center">
                        <Icons.Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {style.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-[#0b5aa5] tracking-wider">
                    {style.vibe}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Assets Status */}
      <div className="pt-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          What Brand Assets Do You Currently Have?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {BRAND_STATUS.map((brand) => {
            const isSelected = formData.brandStatus === brand.id;
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => updateField('brandStatus', brand.id)}
                className={`p-3 sm:p-3.5 rounded-xl text-left border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-[#0b5aa5] text-[#0b5aa5] shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span>{brand.label}</span>
                {isSelected && <Icons.Check className="w-4 h-4 text-[#0b5aa5] shrink-0 ml-2 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reference Links / Inspiration */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
          Inspiration & Benchmark Websites
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icons.ExternalLink className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={formData.inspirationLinks}
            onChange={(e) => updateField('inspirationLinks', e.target.value)}
            placeholder="e.g. izeon.com, stripe.com, apple.com (URLs or brand names you admire)"
            className="w-full pl-10 pr-4 py-2.5 sm:py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          Paste 1 to 3 websites whose look, structure, or animations you would like to emulate.
        </p>
      </div>

      {/* Navigation */}
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
              <span>Continue to Budget & Timeline</span>
              <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
