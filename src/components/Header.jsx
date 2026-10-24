import React from 'react';
import interviewLogo from '../assets/interview logo.png';
import { Icons } from './Icons';

export default function Header({ 
  viewMode, 
  setViewMode, 
  onLoadPreset, 
  onReset, 
  toggleDrawer, 
  drawerOpen,
  selectedFeaturesCount 
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
                IZEON <span className="text-[#0b5aa5]">Innovations</span>
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-blue-50 text-[#0b5aa5] border border-blue-100">
                Scope Studio
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block font-medium truncate">
              Website & Web App Requirement Architect
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
          
          {/* Quick Demo Presets Dropdown */}
          <div className="relative group">
            <button 
              type="button"
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <Icons.Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0b5aa5] shrink-0" />
              <span className="hidden sm:inline">Templates</span>
              <span className="sm:hidden text-xs">Demo</span>
            </button>
            <div className="absolute right-0 mt-1.5 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 py-1.5">
                Quick Test Templates
              </div>
              <button
                type="button"
                onClick={() => onLoadPreset('ecommerce')}
                className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-blue-50 text-slate-700 hover:text-[#0b5aa5] transition flex flex-col cursor-pointer"
              >
                <span className="font-bold text-slate-900">🛍️ E-Commerce Online Store</span>
                <span className="text-slate-500 text-[11px]">Cart, Razorpay/Stripe, Inventory</span>
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('saas')}
                className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-blue-50 text-slate-700 hover:text-[#0b5aa5] transition flex flex-col mt-1 cursor-pointer"
              >
                <span className="font-bold text-slate-900">⚡ Custom SaaS Application</span>
                <span className="text-slate-500 text-[11px]">Auth, Subscriptions, CRM Portal</span>
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button
                type="button"
                onClick={onReset}
                className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-rose-50 text-rose-600 font-semibold transition cursor-pointer"
              >
                ↺ Reset Form
              </button>
            </div>
          </div>

          {/* View Mode Toggle (Wizard vs All-In-One) */}
          <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setViewMode('wizard')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                viewMode === 'wizard'
                  ? 'bg-white text-[#0b5aa5] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Step Wizard
            </button>
            <button
              type="button"
              onClick={() => setViewMode('all-in-one')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                viewMode === 'all-in-one'
                  ? 'bg-white text-[#0b5aa5] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All-In-One
            </button>
          </div>

          {/* WhatsApp Preview Button */}
          <button
            type="button"
            onClick={toggleDrawer}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 sm:gap-2 transition cursor-pointer border ${
              drawerOpen 
                ? 'bg-[#25D366] text-white border-transparent shadow-md' 
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
            }`}
          >
            <Icons.WhatsApp className="w-4 h-4 fill-current text-[#25D366]" />
            <span className="hidden xs:inline">WhatsApp</span>
            {selectedFeaturesCount > 0 && (
              <span className="bg-[#25D366] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {selectedFeaturesCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
