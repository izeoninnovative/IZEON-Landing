import React, { useState } from 'react';
import { formatWhatsAppMessage } from '../utils/whatsappFormatter';
import interviewLogo from '../assets/interview logo.png';
import { Icons } from './Icons';

const OFFICIAL_WHATSAPP = '+918637675438';
const OFFICIAL_WHATSAPP_DISPLAY = '+91 863 767 5438';

export default function LiveBriefDrawer({ isOpen, onClose, formData, onShareWhatsApp }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { rawText, url } = formatWhatsAppMessage(formData, OFFICIAL_WHATSAPP);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    onShareWhatsApp?.();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-[#075e54] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                <img src={interviewLogo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">Live WhatsApp Brief</h3>
                <span className="text-[10px] text-emerald-100">IZEON Scope Architect</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-emerald-800 text-white transition text-sm font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Direct Destination Notice */}
          <div className="px-4 py-3 bg-blue-50/80 border-b border-blue-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icons.WhatsApp className="w-4 h-4 fill-current text-[#25D366]" />
              <span className="text-xs font-bold text-slate-700">Official Desk:</span>
            </div>
            <span className="text-xs font-extrabold text-[#0b5aa5] font-mono">
              {OFFICIAL_WHATSAPP_DISPLAY}
            </span>
          </div>

          {/* Message Preview in WhatsApp Light Chat Theme */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#efeae2]">
            <div className="bg-white text-slate-900 p-3 sm:p-3.5 rounded-2xl rounded-tr-none text-xs font-mono whitespace-pre-wrap border border-slate-200 leading-relaxed shadow-xs">
              {rawText}
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-3.5 sm:p-4 bg-white border-t border-slate-200 space-y-2">
            <button
              type="button"
              onClick={handleSend}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition cursor-pointer"
            >
              <Icons.WhatsApp className="w-5 h-5 fill-current" />
              <span>Send to WhatsApp ({OFFICIAL_WHATSAPP_DISPLAY})</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Icons.Copy className="w-4 h-4 text-[#0b5aa5]" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
