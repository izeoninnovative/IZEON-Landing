import React, { useState } from 'react';
import { PROJECT_TYPES, FEATURE_CATEGORIES, DESIGN_STYLES, BRAND_STATUS, TIMELINES, BUDGET_RANGES } from '../data/presetData';
import { formatWhatsAppMessage } from '../utils/whatsappFormatter';
import interviewLogo from '../assets/interview logo.png';
import { Icons } from './Icons';

const OFFICIAL_WHATSAPP = '+918637675438';
const OFFICIAL_WHATSAPP_DISPLAY = '+91 863 767 5438';

export default function StepReviewShare({ formData, onBack, onShareWhatsApp }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Compute values
  const pType = PROJECT_TYPES.find(p => p.id === formData.projectType)?.title || formData.projectType || 'Not specified';
  const designStyle = DESIGN_STYLES.find(d => d.id === formData.designStyle)?.title || formData.designStyle || 'Not specified';
  const brandStatus = BRAND_STATUS.find(b => b.id === formData.brandStatus)?.label || formData.brandStatus || 'Not specified';
  const timeline = TIMELINES.find(t => t.id === formData.timeline)?.label || formData.timeline || 'Flexible';
  const budget = BUDGET_RANGES.find(b => b.id === formData.budget)?.label || formData.budget || 'To be discussed';

  const allFeatures = FEATURE_CATEGORIES.flatMap(c => c.items);
  const customFeatures = formData.customFeaturesList || [];
  
  const selectedFeatureNames = [
    ...(formData.selectedFeatures?.map(fid => allFeatures.find(f => f.id === fid)?.name).filter(Boolean) || []),
    ...customFeatures.map(c => c.name)
  ];

  // WhatsApp target phone set strictly to user's number
  const { rawText, url: whatsAppUrl } = formatWhatsAppMessage(formData, OFFICIAL_WHATSAPP);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${(formData.companyName || formData.clientName || 'project').toLowerCase().replace(/\s+/g, '_')}_brief.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShareClick = () => {
    onShareWhatsApp?.();
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(whatsAppUrl)}`;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Step Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
          <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>Step 6: Review & WhatsApp Dispatch</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Requirements Brief is Ready to Share!
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Review the structured specifications below and dispatch directly to WhatsApp with one click.
        </p>
      </div>

      {/* Main Grid: WhatsApp Dispatch Card + Live Preview Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Left Column: Dispatch Controls & Summary (7 cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          
          {/* Quick Summary Pill Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 izeon-card-shadow">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Client</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 text-[#0b5aa5] flex items-center justify-center">
                  <Icons.User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                {formData.clientName || 'Not filled'}
              </span>
              <span className="text-[11px] text-[#0b5aa5] font-semibold truncate block">
                {formData.companyName || 'Individual Client'}
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 izeon-card-shadow">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Scope</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icons.Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                {pType.split('/')[0]}
              </span>
              <span className="text-[11px] text-slate-500 truncate block">
                {formData.pageCount || 'Standard'}
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 izeon-card-shadow col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Features</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Icons.Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-emerald-600 block">
                {selectedFeatureNames.length} Modules
              </span>
              <span className="text-[11px] text-slate-500 truncate block">
                {timeline.split(' ')[0]} track
              </span>
            </div>
          </div>

          {/* Official WhatsApp Dispatch Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 izeon-card-shadow">
            
            {/* Direct WhatsApp Contact Destination Display */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/70 border border-blue-200/90 mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icons.WhatsApp className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Official WhatsApp Destination
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 font-mono tracking-tight">
                    {OFFICIAL_WHATSAPP_DISPLAY}
                  </div>
                </div>
              </div>
              <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Verified</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-2.5">
              <button
                type="button"
                onClick={handleShareClick}
                className="w-full py-3.5 px-4 sm:px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-emerald-500/20 transition duration-150 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Icons.WhatsApp className="w-5 h-5 fill-current shrink-0" />
                <span>Share Brief in WhatsApp ({OFFICIAL_WHATSAPP_DISPLAY})</span>
                <Icons.ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
              </button>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="py-2.5 px-2 sm:px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1 sm:gap-1.5 transition cursor-pointer"
                >
                  <Icons.Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0b5aa5] shrink-0" />
                  <span className="truncate">{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="py-2.5 px-2 sm:px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1 sm:gap-1.5 transition cursor-pointer"
                >
                  <Icons.Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0b5aa5] shrink-0" />
                  <span className="truncate">Download</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowQR(!showQR)}
                  className="py-2.5 px-2 sm:px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1 sm:gap-1.5 transition cursor-pointer"
                >
                  <Icons.QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                  <span className="truncate">{showQR ? 'Hide QR' : 'Mobile QR'}</span>
                </button>
              </div>
            </div>

            {/* QR Code Drawer if on Desktop */}
            {showQR && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-bold text-slate-800 mb-1">
                  Scan to Send via WhatsApp on Mobile
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mb-2.5 sm:mb-3">
                  Open your camera to immediately send this brief directly to {OFFICIAL_WHATSAPP_DISPLAY}.
                </p>
                <div className="inline-block p-2 bg-white rounded-xl shadow-xs border border-slate-200">
                  <img
                    src={qrCodeUrl}
                    alt="WhatsApp QR Code"
                    className="w-32 h-32 sm:w-36 sm:h-36"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Navigation Back */}
          {onBack && (
            <div>
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Icons.ArrowLeft className="w-4 h-4" />
                <span>Edit Previous Steps</span>
              </button>
            </div>
          )}

        </div>

        {/* Right Column: WhatsApp Formatted Live Message Screen (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 sm:top-24 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            
            {/* WhatsApp App Mock Header */}
            <div className="bg-[#075e54] text-white px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                  <img src={interviewLogo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">
                    IZEON Scope Architect
                  </div>
                  <div className="text-[10px] text-emerald-200 font-mono">
                    {OFFICIAL_WHATSAPP_DISPLAY}
                  </div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-100 font-mono font-bold">
                WhatsApp Preview
              </span>
            </div>

            {/* WhatsApp Chat Bubble Body */}
            <div className="p-3 sm:p-4 bg-[#efeae2] max-h-[320px] sm:max-h-[460px] overflow-y-auto">
              <div className="bg-white text-slate-900 p-3 sm:p-3.5 rounded-2xl rounded-tr-none text-xs leading-relaxed font-mono whitespace-pre-wrap border border-slate-200/80 shadow-xs select-text">
                {rawText}
              </div>
            </div>

            {/* Chat footer */}
            <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Length: {rawText.length} chars</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[#0b5aa5] hover:text-[#084580] font-bold cursor-pointer"
              >
                {copied ? '✓ Copied' : 'Copy Text'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
