/** @format */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import StepClientInfo from "./components/StepClientInfo";
import StepProjectType from "./components/StepProjectType";
import StepFeatures from "./components/StepFeatures";
import StepDesignVibe from "./components/StepDesignVibe";
import StepBudgetTimeline from "./components/StepBudgetTimeline";
import StepReviewShare from "./components/StepReviewShare";
import LiveBriefDrawer from "./components/LiveBriefDrawer";
import {
  DEMO_PRESETS,
  TIMELINES,
  BUDGET_RANGES,
  PROJECT_TYPES,
} from "./data/presetData";
import interviewLogo from "./assets/interview logo.png";
import { Icons } from "./components/Icons";

const INITIAL_FORM_STATE = {
  clientName: "",
  companyName: "",
  whatsapp: "",
  email: "",
  website: "",
  industry: "",
  projectType: "website",
  pageCount: "1 - 6 Pages",
  selectedFeatures: ["auth-email", "cms-admin", "live-whatsapp", "tech-seo"],
  customFeaturesList: [],
  designStyle: "dark-futuristic",
  brandStatus: "logo-only",
  inspirationLinks: "",
  timeline: "standard",
  budget: "budget-growth",
  notes: "",
};

const STEPS = [
  { id: "client", title: "Client & Info" },
  { id: "scope", title: "Project Scope" },
  { id: "features", title: "Key Features" },
  { id: "design", title: "Design & Vibe" },
  { id: "budget", title: "Timeline & Budget" },
  { id: "share", title: "Review & Share" },
];

export default function App() {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("izeon_req_draft_v2");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_FORM_STATE;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [viewMode, setViewMode] = useState("wizard"); // 'wizard' | 'all-in-one'
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Persist draft
  useEffect(() => {
    try {
      localStorage.setItem("izeon_req_draft_v2", JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Calculate completeness percentage
  const calculateCompleteness = () => {
    let score = 0;
    if (formData.clientName?.trim()) score += 15;
    if (formData.whatsapp?.trim()) score += 15;
    if (formData.companyName?.trim()) score += 5;
    if (formData.projectType) score += 15;
    if (formData.selectedFeatures?.length > 0) score += 20;
    if (formData.designStyle) score += 10;
    if (formData.timeline) score += 10;
    if (formData.budget) score += 10;
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness();

  const handleLoadPreset = (type) => {
    if (DEMO_PRESETS[type]) {
      setFormData({
        ...INITIAL_FORM_STATE,
        ...DEMO_PRESETS[type],
      });
      showToast(
        `Loaded ${type === "ecommerce" ? "E-Commerce" : "SaaS"} sample data!`,
      );
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all fields to a blank form?")) {
      setFormData(INITIAL_FORM_STATE);
      setCurrentStep(1);
      showToast("Form reset to blank state.");
    }
  };

  const handleShareWhatsApp = () => {
    showToast("🚀 Opening WhatsApp with formatted brief...");
    createConfetti();
  };

  const createConfetti = () => {
    try {
      const colors = ["#0b5aa5", "#25D366", "#10b981", "#f59e0b", "#3b82f6"];
      for (let i = 0; i < 35; i++) {
        const div = document.createElement("div");
        div.className =
          "fixed pointer-events-none z-50 rounded-full animate-ping";
        div.style.left = `${Math.random() * 80 + 10}vw`;
        div.style.top = `${Math.random() * 50 + 20}vh`;
        div.style.width = `${Math.random() * 8 + 4}px`;
        div.style.height = div.style.width;
        div.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        div.style.opacity = "0.9";
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 1200);
      }
    } catch {
      // fallback
    }
  };

  const pTypeObj = PROJECT_TYPES.find((p) => p.id === formData.projectType);
  const timelineObj = TIMELINES.find((t) => t.id === formData.timeline);
  const budgetObj = BUDGET_RANGES.find((b) => b.id === formData.budget);

  return (
    <div className="min-h-screen bg-[#f0f4f9] text-slate-800 flex flex-col font-sans relative selection:bg-[#0b5aa5] selection:text-white">
      {/* Top Navigation Bar with Logo */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onLoadPreset={handleLoadPreset}
        onReset={handleReset}
        toggleDrawer={() => setDrawerOpen(!drawerOpen)}
        drawerOpen={drawerOpen}
        selectedFeaturesCount={formData.selectedFeatures?.length || 0}
      />

      {/* Floating Toast Notification matching IZEON Books screenshot */}
      {toastMessage && (
        <div className="fixed top-18 sm:top-20 right-3 sm:right-6 left-3 sm:left-auto z-50 bg-white border border-slate-200/90 text-slate-800 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Icons.Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Requirement Update
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {toastMessage}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage("")}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Page Body Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 sm:pb-8">
        {/* Top Hero Banner matching IZEON Books screenshot */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#064e9a] via-[#0b5aa5] to-[#1268b8] text-white p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-md shadow-[#0b5aa5]/15">
          {/* Subtle watermark logo pattern */}
          <div className="absolute right-[-20px] -bottom-10 opacity-10 pointer-events-none w-48 h-48 sm:w-72 sm:h-72">
            <img
              src={interviewLogo}
              alt=""
              className="w-full h-full object-contain filter invert"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src={interviewLogo}
                  alt="IZEON Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xs mb-1.5 sm:mb-2">
                  IZEON Requirements Studio
                </span>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Client Project Scope collection form
                </h1>
                <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                  Easily specify required features, design preferences,
                  timeline, and budget. Generate an instant structured brief and
                  share directly to WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode: Step-by-Step Wizard */}
        {viewMode === "wizard" ? (
          <div>
            <ProgressBar
              currentStep={currentStep}
              setStep={setCurrentStep}
              steps={STEPS}
              completionPercentage={completeness}
            />

            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-10 izeon-card-shadow transition-all">
              {currentStep === 1 && (
                <StepClientInfo
                  formData={formData}
                  updateField={updateField}
                  onNext={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 2 && (
                <StepProjectType
                  formData={formData}
                  updateField={updateField}
                  onNext={() => setCurrentStep(3)}
                  onBack={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 3 && (
                <StepFeatures
                  formData={formData}
                  updateField={updateField}
                  onNext={() => setCurrentStep(4)}
                  onBack={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 4 && (
                <StepDesignVibe
                  formData={formData}
                  updateField={updateField}
                  onNext={() => setCurrentStep(5)}
                  onBack={() => setCurrentStep(3)}
                />
              )}

              {currentStep === 5 && (
                <StepBudgetTimeline
                  formData={formData}
                  updateField={updateField}
                  onNext={() => setCurrentStep(6)}
                  onBack={() => setCurrentStep(4)}
                />
              )}

              {currentStep === 6 && (
                <StepReviewShare
                  formData={formData}
                  onBack={() => setCurrentStep(5)}
                  onEditStep={(step) => setCurrentStep(step)}
                  onShareWhatsApp={handleShareWhatsApp}
                />
              )}
            </div>
          </div>
        ) : (
          /* View Mode: All-in-One Full Page Form */
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 izeon-card-shadow">
              <StepClientInfo formData={formData} updateField={updateField} />
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 izeon-card-shadow">
              <StepProjectType formData={formData} updateField={updateField} />
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 izeon-card-shadow">
              <StepFeatures formData={formData} updateField={updateField} />
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 izeon-card-shadow">
              <StepDesignVibe formData={formData} updateField={updateField} />
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 izeon-card-shadow">
              <StepBudgetTimeline
                formData={formData}
                updateField={updateField}
              />
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 izeon-card-shadow">
              <StepReviewShare
                formData={formData}
                onShareWhatsApp={handleShareWhatsApp}
              />
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center justify-between gap-2 shadow-lg">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Icons.WhatsApp className="w-4 h-4 fill-current text-[#25D366]" />
          <span>WhatsApp Brief ({completeness}%)</span>
        </button>

        {currentStep < 6 && viewMode === "wizard" && (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
            className="py-2 px-4 rounded-xl bg-[#0b5aa5] text-white font-bold text-xs shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <span>Step {currentStep + 1}</span>
            <Icons.ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Slide-out Live WhatsApp Drawer */}
      <LiveBriefDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        formData={formData}
        onShareWhatsApp={handleShareWhatsApp}
      />
    </div>
  );
}
