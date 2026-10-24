/** @format */

import React from "react";
import { Icons } from "./Icons";

const INDUSTRY_CHIPS = [
  "E-Commerce & Retail",
  "Healthcare & Clinic",
  "SaaS & Software",
  "Real Estate & Construction",
  "Finance & FinTech",
  "Education & EdTech",
  "Restaurant & Hospitality",
  "Creative Agency & Media",
  "Consulting & Professional",
];

export default function StepClientInfo({ formData, updateField, onNext }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Step Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#0b5aa5] text-xs font-bold border border-blue-100 mb-2">
          <Icons.User className="w-3.5 h-3.5" />
          <span>Step 1: Contact & Organization</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Who is this project for?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Provide client or business details to properly address and sign off
          the requirements brief.
        </p>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
            Your Name / Point of Contact{" "}
            <span className="text-[#0b5aa5]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icons.User className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              placeholder="Enter your name"
              className="w-full pl-10 pr-4 py-2.5 sm:py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition"
              required
            />
          </div>
        </div>

        {/* Company / Brand Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
            Company / Brand / Startup Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icons.Building className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Enter company or brand name"
              className="w-full pl-10 pr-4 py-2.5 sm:py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
        </div>

        {/* Mobile Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
            Mobile / Phone Number <span className="text-[#0b5aa5]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Icons.Phone className="w-4 h-4   text-slate-400" />
            </div>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => updateField("whatsapp", e.target.value)}
              placeholder="+91 00000 00000"
              className="w-full pl-10 pr-4 py-2.5 sm:py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition font-mono"
              required
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Include country code (e.g. +91) for direct project communication.
          </p>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icons.Mail className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="name@company.com"
              className="w-full pl-10 pr-4 py-2.5 sm:py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
        </div>

        {/* Current Website or Social Link */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
            Current Website or Social Profile (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icons.Globe className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="https://yourwebsite.com or social profile"
              className="w-full pl-10 pr-4 py-2.5 sm:py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
        </div>

        {/* Industry / Niche with quick selection pills */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
            Target Industry / Business Niche
          </label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => updateField("industry", e.target.value)}
            placeholder="e.g. E-Commerce, Healthcare, SaaS, Real Estate..."
            className="w-full px-4 py-2.5 sm:py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition mb-2"
          />
          <div className="flex flex-wrap gap-1.5">
            {INDUSTRY_CHIPS.map((chip) => {
              const isSelected = formData.industry === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => updateField("industry", chip)}
                  className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-lg border transition cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 border-[#0b5aa5] text-[#0b5aa5] font-bold shadow-xs"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Next button */}
      {onNext && (
        <div className="pt-3 sm:pt-4 flex justify-end border-t border-slate-100">
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#0b5aa5] hover:bg-[#094c8c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0b5aa5]/25 transition cursor-pointer group"
          >
            <span>Proceed to Project Scope</span>
            <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>
      )}
    </div>
  );
}
