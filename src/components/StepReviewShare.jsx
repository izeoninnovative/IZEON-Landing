/** @format */

import React, { useState } from "react";
import {
  PROJECT_TYPES,
  FEATURE_CATEGORIES,
  PAGE_COUNTS,
  DESIGN_STYLES,
  BRAND_STATUS,
  TIMELINES,
  BUDGET_RANGES,
} from "../data/presetData";
import { formatWhatsAppMessage } from "../utils/whatsappFormatter";
import { Icons } from "./Icons";

const OFFICIAL_WHATSAPP = "+918637675438";
const OFFICIAL_WHATSAPP_DISPLAY = "+91 863 767 5438";

export default function StepReviewShare({
  formData,
  onBack,
  onEditStep,
  onShareWhatsApp,
}) {
  const [copied, setCopied] = useState(false);

  // Computed matching objects
  const pTypeObj = PROJECT_TYPES.find((p) => p.id === formData.projectType);
  const designStyleObj = DESIGN_STYLES.find((d) => d.id === formData.designStyle);
  const brandStatusObj = BRAND_STATUS.find((b) => b.id === formData.brandStatus);
  const timelineObj = TIMELINES.find((t) => t.id === formData.timeline);
  const budgetObj = BUDGET_RANGES.find((b) => b.id === formData.budget);

  const pType = pTypeObj?.title || formData.projectType || "Not specified";
  const designStyle = designStyleObj?.title || formData.designStyle || "Not specified";
  const brandStatus = brandStatusObj?.label || formData.brandStatus || "Not specified";
  const timeline = timelineObj?.label || formData.timeline || "Flexible";
  const budget = budgetObj?.label || formData.budget || "To be discussed";

  const allFeatures = FEATURE_CATEGORIES.flatMap((c) => c.items);
  const customFeatures = formData.customFeaturesList || [];

  const selectedFeatureNames = [
    ...(formData.selectedFeatures
      ?.map((fid) => allFeatures.find((f) => f.id === fid)?.name)
      .filter(Boolean) || []),
    ...customFeatures.map((c) => c.name),
  ];

  // WhatsApp target phone set strictly to verified number
  const { rawText, url: whatsAppUrl } = formatWhatsAppMessage(
    formData,
    OFFICIAL_WHATSAPP,
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([rawText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${(formData.companyName || formData.clientName || "project")
      .toLowerCase()
      .replace(/\s+/g, "_")}_brief.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShareClick = () => {
    onShareWhatsApp?.();
    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 mb-2">
            <Icons.Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Step 6: Review & Final Dispatch</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Review Your Project Requirements
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Review every detail entered below before submitting your brief directly to the IZEON engineering desk.
          </p>
        </div>
      </div>

      {/* Comprehensive Data Review Cards */}
      <div className="space-y-4 sm:space-y-5">
          {/* Section 1: Client & Organization Details */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 izeon-card-shadow">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#0b5aa5] flex items-center justify-center shrink-0">
                  <Icons.User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Client & Organization
                  </h3>
                  <span className="text-[11px] text-slate-500">Contact & business background</span>
                </div>
              </div>
              {onEditStep && (
                <button
                  type="button"
                  onClick={() => onEditStep(1)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0b5aa5] flex items-center gap-1 transition cursor-pointer"
                >
                  <Icons.Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Client Name
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block truncate">
                  {formData.clientName || "Not specified"}
                </span>
              </div>

              <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Company / Brand
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block truncate">
                  {formData.companyName || "Not specified"}
                </span>
              </div>

              <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Contact Phone / Mobile
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 flex items-center gap-1 font-mono truncate">
                  <Icons.Phone className="w-3.5 h-3.5 shrink-0 text-[#0b5aa5]" />
                  {formData.whatsapp || "Not specified"}
                </span>
              </div>

              <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Email Address
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block truncate">
                  {formData.email || "Not specified"}
                </span>
              </div>

              <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Industry / Domain
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                  {formData.industry || "Not specified"}
                </span>
              </div>

              <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Current Website / Social
                </span>
                {formData.website ? (
                  <a
                    href={formData.website.startsWith("http") ? formData.website : `https://${formData.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#0b5aa5] hover:underline mt-0.5 flex items-center gap-1 truncate"
                  >
                    <span className="truncate">{formData.website}</span>
                    <Icons.ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                ) : (
                  <span className="text-slate-400 mt-0.5 block">None provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Project Scope & Architecture */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 izeon-card-shadow">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#0b5aa5] flex items-center justify-center shrink-0">
                  <Icons.Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Project Scope & Architecture
                  </h3>
                  <span className="text-[11px] text-slate-500">Core solution framework & estimated scale</span>
                </div>
              </div>
              {onEditStep && (
                <button
                  type="button"
                  onClick={() => onEditStep(2)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0b5aa5] flex items-center gap-1 transition cursor-pointer"
                >
                  <Icons.Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/60 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-extrabold text-[#0b5aa5]">
                      {pType}
                    </span>
                    {pTypeObj?.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#0b5aa5] text-white text-[10px] font-bold uppercase tracking-wider">
                        {pTypeObj.badge}
                      </span>
                    )}
                  </div>
                  {pTypeObj?.description && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {pTypeObj.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                    Estimated Page / Screen Scope
                  </span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">
                    {formData.pageCount || pTypeObj?.defaultPages || "Standard Scope"}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700">
                  {formData.pageCount ? "User Specified" : "Default"}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Selected Key Features */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 izeon-card-shadow">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#0b5aa5] flex items-center justify-center shrink-0">
                  <Icons.Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Key Features & Functional Modules
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    {selectedFeatureNames.length} module{selectedFeatureNames.length === 1 ? "" : "s"} selected
                  </span>
                </div>
              </div>
              {onEditStep && (
                <button
                  type="button"
                  onClick={() => onEditStep(3)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0b5aa5] flex items-center gap-1 transition cursor-pointer"
                >
                  <Icons.Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {selectedFeatureNames.length > 0 ? (
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-56 overflow-y-auto pr-1">
                  {selectedFeatureNames.map((name, idx) => {
                    const isCustom = customFeatures.some((c) => c.name === name);
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border ${
                          isCustom
                            ? "bg-amber-50 text-amber-900 border-amber-200"
                            : "bg-slate-50 text-slate-800 border-slate-200"
                        }`}
                      >
                        <Icons.Check
                          className={`w-3.5 h-3.5 stroke-[3] ${
                            isCustom ? "text-amber-600" : "text-emerald-600"
                          }`}
                        />
                        <span>{name}</span>
                        {isCustom && (
                          <span className="text-[9px] bg-amber-200/80 text-amber-900 px-1 py-0.2 rounded font-bold uppercase">
                            Custom
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center italic">
                No predefined features selected. Custom functional scope will be discussed during consultation.
              </div>
            )}
          </div>

          {/* Section 4: Design Aesthetic & Brand Identity */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 izeon-card-shadow">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#0b5aa5] flex items-center justify-center shrink-0">
                  <Icons.Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Design Aesthetic & Brand Vibe
                  </h3>
                  <span className="text-[11px] text-slate-500">Visual style and brand asset status</span>
                </div>
              </div>
              {onEditStep && (
                <button
                  type="button"
                  onClick={() => onEditStep(4)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0b5aa5] flex items-center gap-1 transition cursor-pointer"
                >
                  <Icons.Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Visual Theme
                </span>
                <span className="font-extrabold text-[#0b5aa5] text-xs sm:text-sm mt-0.5 block">
                  {designStyle}
                </span>
                {designStyleObj?.vibe && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                    {designStyleObj.vibe}
                  </span>
                )}
                {designStyleObj?.desc && (
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {designStyleObj.desc}
                  </p>
                )}
              </div>

              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Brand Assets Status
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block leading-snug">
                  {brandStatus}
                </span>

                <div className="mt-3 pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    References & Inspo Links
                  </span>
                  <span className="text-slate-700 text-xs break-words">
                    {formData.inspirationLinks || "None provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Timeline & Investment Budget */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 izeon-card-shadow">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#0b5aa5] flex items-center justify-center shrink-0">
                  <Icons.DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Timeline, Budget & Special Notes
                  </h3>
                  <span className="text-[11px] text-slate-500">Delivery schedule, estimated budget & custom notes</span>
                </div>
              </div>
              {onEditStep && (
                <button
                  type="button"
                  onClick={() => onEditStep(5)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0b5aa5] flex items-center gap-1 transition cursor-pointer"
                >
                  <Icons.Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Target Delivery Track
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">
                  {timeline}
                </span>
                {timelineObj?.badge && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {timelineObj.badge}
                  </span>
                )}
              </div>

              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Target Investment Range
                </span>
                <span className="font-bold text-[#0b5aa5] text-xs sm:text-sm mt-0.5 block">
                  {budget}
                </span>
                {budgetObj?.desc && (
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {budgetObj.desc}
                  </span>
                )}
              </div>
            </div>

            {/* Special Notes & Custom Requirements */}
            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">
                Special Notes & Additional Instructions
              </span>
              {formData.notes?.trim() ? (
                <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {formData.notes}
                </p>
              ) : (
                <span className="text-slate-400 text-xs italic">
                  No additional custom notes provided.
                </span>
              )}
            </div>
          </div>
        </div>

      {/* Main Bottom Navigation & Action Bar: Beautifully Aligned */}
      <div className="pt-5 sm:pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Navigation Back to Previous Steps */}
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            <span>Edit Previous Steps</span>
          </button>
        ) : (
          <div className="hidden sm:block"></div>
        )}

        {/* Right Side: Cleanly Aligned Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-none py-3 px-3 sm:px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Icons.Copy className="w-3.5 h-3.5 text-[#0b5aa5] shrink-0" />
              <span>{copied ? "Copied!" : "Copy Brief"}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 sm:flex-none py-3 px-3 sm:px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Icons.Download className="w-3.5 h-3.5 text-[#0b5aa5] shrink-0" />
              <span>Download Brief</span>
            </button>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={handleShareClick}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#154E98] hover:bg-[#103d77] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#154E98]/25 transition cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <span>Submit Requirements</span>
            <Icons.ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
