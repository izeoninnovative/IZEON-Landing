import React, { useState } from 'react';
import { FEATURE_CATEGORIES } from '../data/presetData';
import { Icons } from './Icons';

export default function StepFeatures({ formData, updateField, onNext, onBack }) {
  const [customFeature, setCustomFeature] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const selectedList = formData.selectedFeatures || [];

  const toggleFeature = (id) => {
    let updated;
    if (selectedList.includes(id)) {
      updated = selectedList.filter((item) => item !== id);
    } else {
      updated = [...selectedList, id];
    }
    updateField('selectedFeatures', updated);
  };

  const handleAddCustomFeature = (e) => {
    e.preventDefault();
    if (!customFeature.trim()) return;
    const customId = `custom-${Date.now()}`;
    const customName = customFeature.trim();
    
    updateField('selectedFeatures', [...selectedList, customId]);

    const existingCustom = formData.customFeaturesList || [];
    updateField('customFeaturesList', [...existingCustom, { id: customId, name: customName }]);
    setCustomFeature('');
  };

  const selectAllInCategory = (categoryItems) => {
    const itemIds = categoryItems.map(i => i.id);
    const newItems = Array.from(new Set([...selectedList, ...itemIds]));
    updateField('selectedFeatures', newItems);
  };

  const clearAllFeatures = () => {
    updateField('selectedFeatures', []);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#0b5aa5] text-xs font-bold border border-blue-100 mb-2">
            <Icons.Cpu className="w-3.5 h-3.5" />
            <span>Step 3: Functional Specifications</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Which features do you need?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Tap the modules you want included in your custom solution.
          </p>
        </div>

        {/* Selected Counter & Clear */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0b5aa5] text-xs font-extrabold flex items-center gap-1.5">
            <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{selectedList.length} Selected</span>
          </div>
          {selectedList.length > 0 && (
            <button
              type="button"
              onClick={clearAllFeatures}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs border border-slate-200 transition font-medium cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Filter: Smooth horizontal swipe on mobile */}
      <div className="flex gap-1.5 sm:gap-2 pb-1 border-b border-slate-100 overflow-x-auto no-scrollbar -mx-1 px-1">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeCategory === 'all'
              ? 'bg-[#0b5aa5] text-white shadow-xs'
              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
          }`}
        >
          All Modules
        </button>
        {FEATURE_CATEGORIES.map((cat) => (
          <button
            key={cat.category}
            type="button"
            onClick={() => setActiveCategory(cat.category)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              activeCategory === cat.category
                ? 'bg-[#0b5aa5] text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            {cat.category.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Grouped Features */}
      <div className="space-y-4 sm:space-y-5">
        {FEATURE_CATEGORIES
          .filter(cat => activeCategory === 'all' || activeCategory === cat.category)
          .map((catGroup) => (
            <div key={catGroup.category} className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-3.5 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0b5aa5]"></span>
                  {catGroup.category}
                </h3>
                <button
                  type="button"
                  onClick={() => selectAllInCategory(catGroup.items)}
                  className="text-xs text-[#0b5aa5] hover:text-[#084580] font-bold cursor-pointer"
                >
                  Select All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {catGroup.items.map((item) => {
                  const isChecked = selectedList.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFeature(item.id)}
                      className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-blue-50/80 border-[#0b5aa5] shadow-xs'
                          : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition ${
                        isChecked
                          ? 'bg-[#0b5aa5] text-white shadow-xs'
                          : 'border border-slate-300 bg-slate-50'
                      }`}>
                        {isChecked && <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold leading-tight truncate ${isChecked ? 'text-[#0b5aa5]' : 'text-slate-800'}`}>
                          {item.name}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* Custom Features Adder */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 izeon-card-shadow">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Add Custom Requirement Not Listed Above
        </label>
        <form onSubmit={handleAddCustomFeature} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
            placeholder="e.g. Integrate Tally/GST accounting ERP sync or custom API"
            className="flex-1 px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#0b5aa5] focus:ring-2 focus:ring-blue-100 transition"
          />
          <button
            type="submit"
            disabled={!customFeature.trim()}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#0b5aa5] hover:bg-[#094c8c] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
          >
            + Add Feature
          </button>
        </form>

        {formData.customFeaturesList && formData.customFeaturesList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
            {formData.customFeaturesList.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-blue-50 text-[#0b5aa5] border border-blue-200 text-xs font-bold"
              >
                ✓ {c.name}
                <button
                  type="button"
                  onClick={() => {
                    updateField('selectedFeatures', selectedList.filter(id => id !== c.id));
                    updateField('customFeaturesList', formData.customFeaturesList.filter(item => item.id !== c.id));
                  }}
                  className="ml-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
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
              <span>Continue to Aesthetics & Vibe</span>
              <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
