/** @format */

import React from "react";
import interviewLogo from "../assets/interview logo.png";
import { Icons } from "./Icons";

export default function Header({
  viewMode,
  setViewMode,
  onLoadPreset,
  onReset,
  toggleDrawer,
  drawerOpen,
  selectedFeaturesCount,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 izeon-card-shadow">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand / Logo with interview logo.png */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full p-0.5 bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src={interviewLogo}
              alt="IZEON Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                IZEON <span className="text-[#0b5aa5]">Innovative</span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block font-medium truncate">
              Website & Web App Requirement Collection Form
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
          {/* Quick Demo Presets Dropdown */}

          {/* View Mode Toggle (Wizard vs All-In-One) */}
          <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setViewMode("wizard")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                viewMode === "wizard"
                  ? "bg-white text-[#0b5aa5] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Step Wizard
            </button>
            <button
              type="button"
              onClick={() => setViewMode("all-in-one")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                viewMode === "all-in-one"
                  ? "bg-white text-[#0b5aa5] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All-In-One
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
