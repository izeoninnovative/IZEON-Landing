/** @format */

import React from "react";
import { TIMELINES, BUDGET_RANGES } from "../data/presetData";
import { Icons } from "./Icons";

export default function StepBudgetTimeline({
  formData,
  updateField,
  onNext,
  onBack,
}) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Step Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#0b5aa5] text-xs font-bold border border-blue-100 mb-2">
          <Icons.DollarSign className="w-3.5 h-3.5" />
          <span>Step 5: Investment & Milestones</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          What is your timeline & budget expectations?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Calibrates development team allocations, sprints, and tech stack
          choices.
        </p>
      </div>

      {/* Timeline Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Target Launch Schedule
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {TIMELINES.map((t) => {
            const isSelected = formData.timeline === t.id;
            return (
              <div
                key={t.id}
                onClick={() => updateField("timeline", t.id)}
                className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer border transition flex flex-col justify-between ${
                  isSelected
                    ? "bg-blue-50/70 border-[#0b5aa5] ring-2 ring-[#0b5aa5]/20 shadow-xs"
                    : "bg-white hover:bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#0b5aa5] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t.badge}
                  </span>
                  {isSelected && (
                    <Icons.Check className="w-4 h-4 text-[#0b5aa5] stroke-[3]" />
                  )}
                </div>
                <div
                  className={`text-xs font-bold ${isSelected ? "text-[#0b5aa5]" : "text-slate-900"}`}
                >
                  {t.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Ranges */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Estimated Budget Bracket
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {BUDGET_RANGES.map((b) => {
            const isSelected = formData.budget === b.id;
            return (
              <div
                key={b.id}
                onClick={() => updateField("budget", b.id)}
                className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? "bg-blue-50/80 border-[#0b5aa5] shadow-xs"
                    : "bg-white hover:bg-slate-50 border-slate-200"
                }`}
              >
                <div>
                  <div
                    className={`text-xs font-bold ${isSelected ? "text-[#0b5aa5]" : "text-slate-900"}`}
                  >
                    {b.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {b.desc}
                  </div>
                </div>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-[#0b5aa5] text-white flex items-center justify-center shrink-0 ml-2">
                    <Icons.Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
          Special Notes & Additional Requirements
        </label>
        <textarea
          rows={3}
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          placeholder="Mention specific workflows, third-party ERP integrations, deadline dates, or any special questions for the IZEON engineering team..."
          className="w-full px-3.5 py-2.5 sm:py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition resize-y"
        ></textarea>
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
          ) : (
            <div className="hidden sm:block"></div>
          )}

          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0b5aa5] hover:bg-[#094c8c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0b5aa5]/25 transition cursor-pointer group"
            >
              <span>Review & Submit </span>
              <Icons.Cpu className="w-4 h-4 fill-current text-[#FFFFFF]" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
