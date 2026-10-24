export const PROJECT_TYPES = [
  {
    id: 'website',
    title: 'Modern Website / Landing Page',
    description: 'High-converting business showcase, portfolio, agency, or corporate website.',
    icon: 'Globe',
    badge: 'Popular',
    defaultPages: '1 - 6 Pages'
  },
  {
    id: 'webapp',
    title: 'Custom Web Application / SaaS',
    description: 'Full-stack dynamic web app with dashboards, databases, user logins & workflows.',
    icon: 'Code',
    badge: 'High Value',
    defaultPages: '6 - 15+ Screens'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store & Shop',
    description: 'Sell physical or digital products with cart, payments, inventory & order tracking.',
    icon: 'CreditCard',
    badge: 'Revenue Focused',
    defaultPages: 'Catalog + Checkout'
  },
  {
    id: 'portal',
    title: 'Client / Admin Portal & CRM',
    description: 'Internal business software, employee dashboard, customer management or ERP.',
    icon: 'Layers',
    badge: 'Enterprise',
    defaultPages: 'Multi-role Dashboard'
  },
  {
    id: 'booking',
    title: 'Booking & Appointment System',
    description: 'Real-time schedule booking, event ticketing, clinic or salon management.',
    icon: 'Calendar',
    badge: 'Interactive',
    defaultPages: '3 - 8 Screens'
  },
  {
    id: 'ai-app',
    title: 'AI-Powered App / Assistant',
    description: 'LLM chatbot integration, automated report generator, smart content studio.',
    icon: 'Sparkles',
    badge: 'Cutting Edge',
    defaultPages: 'Interactive Tools'
  }
];

export const PAGE_COUNTS = [
  { id: '1-page', label: 'Single Page / Landing (1 Page)' },
  { id: '2-5', label: 'Compact Site (2 - 5 Pages)' },
  { id: '6-12', label: 'Standard Multi-page (6 - 12 Pages)' },
  { id: '13-25', label: 'Comprehensive Scope (13 - 25 Screens)' },
  { id: 'custom-scale', label: 'Large Scale / Enterprise Platform (25+)' }
];

export const FEATURE_CATEGORIES = [
  {
    category: 'User Authentication & Access',
    items: [
      { id: 'auth-email', name: 'Email & Password Login / Signup', desc: 'Secure hashed authentication with verification' },
      { id: 'auth-social', name: 'Social Login (Google / Apple / GitHub)', desc: 'One-click friction-free onboarding' },
      { id: 'auth-roles', name: 'Multi-Role Access (Admin, Staff, Customer)', desc: 'Different permissions and dedicated dashboards' },
      { id: 'auth-profiles', name: 'User Profile & Settings Management', desc: 'Avatar, personal info, order history' }
    ]
  },
  {
    category: 'Payments & Monetization',
    items: [
      { id: 'pay-gateway', name: 'Online Payment Gateway (Stripe / Razorpay / PayPal)', desc: 'Accept credit cards, UPI, net banking' },
      { id: 'pay-subs', name: 'Recurring Subscriptions & Memberships', desc: 'Auto-renewing monthly or annual SaaS billing' },
      { id: 'pay-invoicing', name: 'Automated Invoices & PDF Receipts', desc: 'Instant downloadable receipts for customers' },
      { id: 'pay-coupons', name: 'Discount Codes & Promotion Engine', desc: 'Referral codes, percent discounts & sales limits' }
    ]
  },
  {
    category: 'Content & Administration',
    items: [
      { id: 'cms-admin', name: 'Self-Service Admin Dashboard', desc: 'Add/edit products, blogs, users without coding' },
      { id: 'cms-blog', name: 'Blog & Article Publishing System', desc: 'SEO-optimized articles with rich markdown/WYSIWYG' },
      { id: 'cms-media', name: 'Media / Video / PDF Document Library', desc: 'Cloudinary / S3 cloud storage integration' },
      { id: 'cms-multilingual', name: 'Multi-Language Support (i18n)', desc: 'Switch languages (English, Tamil, Hindi, Arabic, etc.)' }
    ]
  },
  {
    category: 'Real-time & Engagement',
    items: [
      { id: 'live-whatsapp', name: 'Floating WhatsApp Chat & Lead Button', desc: 'Instant 1-click customer contact' },
      { id: 'live-notifs', name: 'Email & SMS Notifications (Twilio / SendGrid)', desc: 'Order confirmation, reminders & alerts' },
      { id: 'live-booking', name: 'Live Calendar Booking & Slot Reservation', desc: 'Sync with Google Calendar / Calendly' },
      { id: 'live-reviews', name: 'Customer Reviews, Ratings & Testimonials', desc: 'Social proof booster with photo reviews' }
    ]
  },
  {
    category: 'AI, Analytics & Advanced Tech',
    items: [
      { id: 'ai-chatbot', name: 'Smart AI Chatbot & Customer Support', desc: 'Trained on company FAQs & docs' },
      { id: 'ai-search', name: 'Instant Search & Filter with Auto-complete', desc: 'Lightning-fast fuzzy search' },
      { id: 'tech-seo', name: 'Full SEO Optimization & Meta Tags', desc: 'Schema markup, sitemap, OpenGraph previews' },
      { id: 'tech-analytics', name: 'Google Analytics & Facebook Pixel Tracking', desc: 'Track traffic sources and conversion funnels' },
      { id: 'tech-pwa', name: 'Progressive Web App (PWA) / Mobile App feel', desc: 'Installable on iOS & Android home screens' }
    ]
  }
];

export const DESIGN_STYLES = [
  {
    id: 'dark-futuristic',
    title: 'Sleek Dark & Glassmorphism',
    desc: 'Deep futuristic midnight gradients, glowing neon highlights & frosted glass cards.',
    vibe: 'Modern Tech & Web3'
  },
  {
    id: 'clean-minimal',
    title: 'Apple-Style Minimalist',
    desc: 'Spacious white backgrounds, refined typography, subtle shadows and crisp spacing.',
    vibe: 'Premium & Timeless'
  },
  {
    id: 'bold-colorful',
    title: 'Bold, Vibrant & Energetic',
    desc: 'Eye-catching gradients, expressive typography, high-contrast CTAs and animations.',
    vibe: 'Startups & Youth Brands'
  },
  {
    id: 'corporate-trust',
    title: 'Corporate, Clean & Trustworthy',
    desc: 'Professional blues and neutrals, structured grids, credible badges and clear data.',
    vibe: 'B2B, Finance & Healthcare'
  },
  {
    id: 'luxury-elegant',
    title: 'Luxury & High-End Aesthetic',
    desc: 'Gold/champagne accents, serif headings, dark tones and sophisticated elegance.',
    vibe: 'Real Estate, Jewelry & Haute'
  }
];

export const BRAND_STATUS = [
  { id: 'complete-assets', label: 'Have Logo, Brand Colors & Fonts Ready' },
  { id: 'logo-only', label: 'Have Logo only (Need help with colors & style)' },
  { id: 'figma-ready', label: 'Have Figma / Adobe XD UI Designs Ready' },
  { id: 'from-scratch', label: 'Starting from scratch (Need Full Branding Assistance)' }
];

export const TIMELINES = [
  { id: 'urgent', label: 'Urgent / Express (1 - 2 Weeks)', badge: 'Fast Track' },
  { id: 'standard', label: 'Standard (3 - 5 Weeks)', badge: 'Recommended' },
  { id: 'relaxed', label: 'Flexible / 2 - 3 Months', badge: 'Thorough' },
  { id: 'planning', label: 'Exploration / Planning Stage', badge: 'Consulting' }
];

export const BUDGET_RANGES = [
  { id: 'budget-starter', label: '₹20,000 - ₹50,000 (~$250 - $600)', desc: 'Standard Landing / Starter Business Site' },
  { id: 'budget-growth', label: '₹50,000 - ₹1,20,000 (~$600 - $1,500)', desc: 'Custom Business Website / Catalog / Starter Store' },
  { id: 'budget-pro', label: '₹1,20,000 - ₹3,00,000 (~$1,500 - $3,500)', desc: 'Full E-commerce / SaaS MVP / Custom Web App' },
  { id: 'budget-enterprise', label: '₹3,00,000+ ($3,500+)', desc: 'Scale Web Application / Multi-tenant Platform' },
  { id: 'budget-custom', label: 'Flexible / Quote based on features', desc: 'Discuss custom pricing milestones' }
];

export const DEMO_PRESETS = {
  ecommerce: {
    clientName: 'Sarah Jenkins',
    companyName: 'Aura Lifestyle & Apparel',
    email: 'sarah@auralifestyle.com',
    whatsapp: '+919876543210',
    website: 'https://instagram.com/auralifestyle',
    industry: 'Fashion, Apparel & Luxury Retail',
    projectType: 'ecommerce',
    pageCount: 'Catalog + Checkout',
    selectedFeatures: ['pay-gateway', 'pay-coupons', 'cms-admin', 'live-whatsapp', 'tech-analytics', 'tech-seo', 'auth-profiles'],
    designStyle: 'luxury-elegant',
    brandStatus: 'complete-assets',
    inspirationLinks: 'Gymshark.com, AloYoga.com',
    timeline: 'standard',
    budget: 'budget-growth',
    notes: 'Need Instagram shop sync and quick WhatsApp order notifications for cash on delivery.'
  },
  saas: {
    clientName: 'Alex Rivera',
    companyName: 'FlowDesk CRM',
    email: 'alex@flowdesk.io',
    whatsapp: '+14155552671',
    website: 'https://flowdesk.io',
    industry: 'B2B Software & Real Estate CRM',
    projectType: 'webapp',
    pageCount: '13-25',
    selectedFeatures: ['auth-email', 'auth-social', 'auth-roles', 'pay-subs', 'pay-invoicing', 'cms-admin', 'ai-chatbot', 'tech-analytics'],
    designStyle: 'dark-futuristic',
    brandStatus: 'figma-ready',
    inspirationLinks: 'Linear.app, Supabase.com, Stripe.com',
    timeline: 'standard',
    budget: 'budget-pro',
    notes: 'We have full Figma mockups ready. We need clean React + Tailwind frontend with dark/light mode toggle and fast loading speed.'
  }
};
