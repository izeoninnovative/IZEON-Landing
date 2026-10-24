import { PROJECT_TYPES, FEATURE_CATEGORIES, DESIGN_STYLES, BRAND_STATUS, TIMELINES, BUDGET_RANGES } from '../data/presetData';

export function formatWhatsAppMessage(formData, recipientPhone = '') {
  const pType = PROJECT_TYPES.find(p => p.id === formData.projectType)?.title || formData.projectType || 'Not specified';
  const designStyle = DESIGN_STYLES.find(d => d.id === formData.designStyle)?.title || formData.designStyle || 'Not specified';
  const brandStatus = BRAND_STATUS.find(b => b.id === formData.brandStatus)?.label || formData.brandStatus || 'Not specified';
  const timeline = TIMELINES.find(t => t.id === formData.timeline)?.label || formData.timeline || 'Flexible';
  const budget = BUDGET_RANGES.find(b => b.id === formData.budget)?.label || formData.budget || 'To be discussed';

  // Gather selected feature names
  const allFeatures = FEATURE_CATEGORIES.flatMap(c => c.items);
  const selectedFeatureNames = formData.selectedFeatures
    ?.map(fid => allFeatures.find(f => f.id === fid)?.name)
    .filter(Boolean) || [];

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const lines = [
    `🚀 *PROJECT REQUIREMENTS BRIEF* 🚀`,
    `_IZEON Client Requirements_ | ${dateStr}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `👤 *CLIENT DETAILS:*`,
    `• *Client Name:* ${formData.clientName || 'N/A'}`,
    `• *Company/Brand:* ${formData.companyName || 'N/A'}`,
    `• *WhatsApp/Phone:* ${formData.whatsapp || 'N/A'}`,
    `• *Email:* ${formData.email || 'N/A'}`,
    formData.industry ? `• *Industry/Niche:* ${formData.industry}` : null,
    formData.website ? `• *Current Site/Social:* ${formData.website}` : null,
    ``,
    `🎯 *PROJECT TYPE & SCOPE:*`,
    `• *Type:* ${pType}`,
    formData.pageCount ? `• *Estimated Scale:* ${formData.pageCount}` : null,
    ``,
    `⚡ *CORE REQUIRED FEATURES (${selectedFeatureNames.length}):*`,
    selectedFeatureNames.length > 0 
      ? selectedFeatureNames.map(f => `  ✓ ${f}`).join('\n')
      : `  • Custom functional requirements to be discussed`,
    ``,
    `🎨 *DESIGN & BRANDING PREFERENCE:*`,
    `• *Aesthetic Style:* ${designStyle}`,
    `• *Assets Ready:* ${brandStatus}`,
    formData.inspirationLinks ? `• *References / Inspo:* ${formData.inspirationLinks}` : null,
    ``,
    `⏱️ *TIMELINE & BUDGET:*`,
    `• *Target Delivery:* ${timeline}`,
    `• *Budget Range:* ${budget}`,
    ``,
    formData.notes ? `📝 *SPECIAL NOTES & CUSTOM REQUIREMENTS:*\n${formData.notes}\n` : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `✨ _Generated via IZEON Requirements Studio_`
  ].filter(line => line !== null);

  const rawText = lines.join('\n');
  const encoded = encodeURIComponent(rawText);
  
  // Clean phone number (strip spaces, dashes, parentheses)
  const cleanPhone = recipientPhone.replace(/[^0-9]/g, '');
  const url = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;

  return {
    rawText,
    url
  };
}

export function triggerConfetti() {
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
