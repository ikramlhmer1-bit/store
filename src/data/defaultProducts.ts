import { DigitalProduct } from '../types/product';

export const INITIAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'sketchup-pro-2026',
    title: 'SketchUp Pro 2026 Full Version Lifetime (Instant Download) MacOS and Windows',
    shortTitle: 'SketchUp Pro 2026',
    subtitle: 'Design it. Model it. Build it.',
    category: '3D & CAD',
    price: 30.00,
    originalPrice: 349.00,
    currency: 'USD',
    version: '2026 v26.0.482',
    os: ['windows', 'mac'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-slate-100 via-sky-50 to-blue-100',
      textColor: 'text-slate-900',
      accentColor: '#0284c7',
      logoText: 'SketchUp Pro 2026',
      badgeText: '3D MODELING',
      illustrationType: 'wireframe-house'
    },
    deliveryDetails: {
      fileSize: '1.45 GB',
      downloadSpeed: 'Instant Direct CDN',
      sampleKey: 'SKUP-2026-9481-B892-LIFETIME',
      installerUrl: 'https://cdn.soft-cad.com/installers/sketchup-pro-2026-multi.zip',
      format: 'Full Installer DMG & EXE'
    },
    description: 'SketchUp Pro 2026 is the intuitive 3D modeling and architectural design software that lets you create, visualize, and communicate concepts with precision and freedom. Includes full LayOut, Style Builder, and 3D Warehouse integration with genuine lifetime activation.',
    features: [
      'Lifetime Genuine License for 1 User (Up to 2 Devices)',
      'Compatible with Windows 11/10 and macOS Sonoma/Sequoia',
      'Instant Download & License Key delivery in under 60 seconds',
      'Full 3D Warehouse Access and LayOut 2D documentation suite',
      'No monthly or annual subscription fees ever'
    ],
    systemRequirements: {
      os: 'Windows 10/11 64-bit or macOS 12 Monterey or newer',
      cpu: '2.1+ GHz Intel / AMD multi-core or Apple Silicon M1/M2/M3/M4',
      ram: '8 GB RAM (16 GB Recommended)',
      storage: '2 GB available hard-disk space',
      graphics: '3D class video card with 1 GB of memory or higher and hardware acceleration'
    },
    rating: 4.9,
    reviewsCount: 142,
    salesCount: 890,
    isBestSeller: true,
    isFeatured: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'autodesk-autocad-2027',
    title: 'Autodesk Autocad 2027 Full Version Windows/Mac (Instant Download)',
    shortTitle: 'Autodesk AutoCAD 2027',
    subtitle: 'Precise 2D & 3D Design Solution',
    category: '3D & CAD',
    price: 30.00,
    originalPrice: 480.00,
    currency: 'USD',
    version: '2027 Build 31.0',
    os: ['windows', 'mac'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-rose-50 via-red-50 to-amber-50',
      textColor: 'text-slate-900',
      accentColor: '#dc2626',
      logoText: 'AUTODESK AUTOCAD 2027',
      badgeText: 'CAD SUITE',
      illustrationType: 'wireframe-house'
    },
    deliveryDetails: {
      fileSize: '3.80 GB',
      downloadSpeed: 'High Speed Direct Server',
      sampleKey: 'ACAD-2027-4402-9812-PROKEY',
      installerUrl: 'https://cdn.soft-cad.com/installers/autocad-2027-multilingual.iso',
      format: 'ISO Direct Image + Setup Assistant'
    },
    description: 'AutoCAD 2027 powers your 2D drafting and 3D modeling workflows with specialized toolsets for architecture, mechanical, and electrical engineering. Get full command automation, high-performance graphics engine, and universal DWG file compatibility.',
    features: [
      'Official Full Version with Permanent Offline & Online Activation',
      'Specialized Architecture, Mechanical & Electrical Toolsets',
      'Trace & Share tools for cloud-assisted markup',
      'Includes DWG Compare and Sheet Set Manager',
      '100% Virus-Free & Clean Signature Verified'
    ],
    systemRequirements: {
      os: '64-bit Windows 11/10 or macOS 13 Ventura / 14 Sonoma',
      cpu: '3.0 GHz or greater multi-core processor',
      ram: '16 GB RAM recommended',
      storage: '6.0 GB free disk space for installation',
      graphics: '4 GB GPU with 106 GB/s Bandwidth and DirectX 12 compliant'
    },
    rating: 4.95,
    reviewsCount: 318,
    salesCount: 1450,
    isBestSeller: true,
    isFeatured: true,
    createdAt: '2026-01-12'
  },
  {
    id: 'fl-studio-2026-producer',
    title: 'FL Studio 2026 Producer Edition Lifetime License (Instant Download)',
    shortTitle: 'FL Studio 2026 Producer',
    subtitle: 'Music Production & Beatmaking Suite',
    category: 'Audio & Music',
    price: 30.00,
    originalPrice: 249.00,
    currency: 'USD',
    version: '2026 v24.2.1',
    os: ['windows', 'mac'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-zinc-900 via-neutral-900 to-black',
      textColor: 'text-white',
      accentColor: '#f97316',
      logoText: 'FL STUDIO 26',
      badgeText: 'PRODUCER EDITION',
      illustrationType: 'waveform'
    },
    deliveryDetails: {
      fileSize: '1.20 GB',
      downloadSpeed: 'Instant CDN (1 Gbps)',
      sampleKey: 'FLST-2026-8831-7712-PRODUCER',
      installerUrl: 'https://cdn.soft-cad.com/installers/fl-studio-2026-producer.exe',
      format: 'Official Installer + Regkey File'
    },
    description: 'FL Studio 2026 Producer Edition is the premier digital audio workstation (DAW) trusted by leading music producers and beatmakers worldwide. Complete audio recording, Edison editor, Sytrus, Maximus, Piano Roll, and multi-track audio editing with lifetime free updates included.',
    features: [
      'Full Audio Recording, Stem Separation & Stem Extraction',
      'Industry-standard Piano Roll & Pattern Sequencer',
      'Includes Sytrus, Maximus, Vocodex, Fruity Reeverb 2, and 80+ plugins',
      'Full VST 1/2/3 and Audio Units (AU) support',
      'Lifetime Free Updates guarantee'
    ],
    systemRequirements: {
      os: 'Windows 10/11 (64-bit) or macOS 11 Big Sur and newer',
      cpu: 'Intel or AMD CPU with SSE2 support / Apple Silicon native',
      ram: '4 GB minimum (8 GB or more recommended)',
      storage: '4 GB free disk space'
    },
    rating: 5.0,
    reviewsCount: 520,
    salesCount: 2890,
    isBestSeller: true,
    isFeatured: true,
    createdAt: '2026-01-05'
  },
  {
    id: 'wilcom-e4-2-embroidery',
    title: 'Wilcom e4.2 Embroidery Software Lifetime License (Instant Download)',
    shortTitle: 'Wilcom e4.2 Embroidery Studio',
    subtitle: 'Commercial Embroidery Digitizing',
    category: 'Graphic Design',
    price: 30.00,
    originalPrice: 380.00,
    currency: 'USD',
    version: 'e4.2 Designing Edition',
    os: ['windows'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-blue-950 via-indigo-900 to-slate-900',
      textColor: 'text-white',
      accentColor: '#38bdf8',
      logoText: 'WILCOM e4.2',
      badgeText: 'EMBROIDERY STUDIO',
      illustrationType: 'scissors'
    },
    deliveryDetails: {
      fileSize: '2.10 GB',
      downloadSpeed: 'Direct Server Mirror',
      sampleKey: 'WLC-E42-9921-3810-DESIGNS',
      installerUrl: 'https://cdn.soft-cad.com/installers/wilcom-e4.2-studio.iso',
      format: 'Standalone ISO + CorelDRAW Graphics Integration'
    },
    description: 'Wilcom EmbroideryStudio e4.2 is the gold standard for custom embroidery digitizing, lettering, monogramming, and apparel decorating. Seamlessly integrates with CorelDRAW for vector-to-stitch creation and multi-head production.',
    features: [
      'Complete Digitizing Tools for Tatami, Satin, Run & Specialty Stitches',
      'TrueType Font Conversion and 200+ Professional Embroidery Fonts',
      'Integrated CorelDRAW Graphics Suite Bridge',
      'Direct Machine Connection (Tajima, Barudan, Brother, Janome)',
      'Lifetime Activation Dongle-Free Virtual Driver'
    ],
    systemRequirements: {
      os: 'Windows 10 / 11 64-bit only',
      cpu: 'Intel Core i5/i7 or AMD Ryzen 5 or higher',
      ram: '8 GB RAM minimum (16 GB recommended)',
      storage: '40 GB hard disk space for embroidery catalog'
    },
    rating: 4.88,
    reviewsCount: 94,
    salesCount: 420,
    isBestSeller: true,
    isFeatured: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'coreldraw-graphics-suite-2026',
    title: 'CorelDRAW Graphics Suite 2026 Full Version (Instant Download)',
    shortTitle: 'CorelDRAW Graphics Suite 2026',
    subtitle: 'Vector Illustration & Professional Photo Editing',
    category: 'Graphic Design',
    price: 30.00,
    originalPrice: 320.00,
    currency: 'USD',
    version: '2026 v26.1.0',
    os: ['windows', 'mac'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-zinc-950 via-zinc-900 to-black',
      textColor: 'text-white',
      accentColor: '#22c55e',
      logoText: 'CorelDRAW 2026',
      badgeText: 'GRAPHICS SUITE',
      illustrationType: 'palette'
    },
    deliveryDetails: {
      fileSize: '1.95 GB',
      downloadSpeed: 'Instant Cloud Mirror',
      sampleKey: 'CD26-8801-4491-0021-GRAPHICS',
      installerUrl: 'https://cdn.soft-cad.com/installers/coreldraw-2026-suite.zip',
      format: 'Official Installer + Silent Activation'
    },
    description: 'CorelDRAW Graphics Suite 2026 delivers all-in-one vector illustration, multi-page layout, typography, and photo editing tools. Ideal for signage, logos, apparel, marketing collateral, and web graphics.',
    features: [
      'CorelDRAW (Vector Illustration) + Corel PHOTO-PAINT + Font Manager',
      'Non-destructive image adjustments and live typography styling',
      'Multipage view and asset export docker for web & print formats',
      'Fully offline lifetime activation with zero telemetry blocks',
      'Cross-platform support for Windows and Mac'
    ],
    systemRequirements: {
      os: 'Windows 11 or Windows 10 (64-Bit) / macOS Monterey 12+',
      cpu: 'Intel Core i3/5/7/9 or AMD Ryzen 3/5/7/9 / Apple Silicon M-series',
      ram: '8 GB RAM (16 GB recommended)',
      storage: '5.5 GB hard disk space for application files'
    },
    rating: 4.92,
    reviewsCount: 178,
    salesCount: 760,
    isBestSeller: true,
    isFeatured: false,
    createdAt: '2026-01-18'
  },
  {
    id: 'autodesk-revit-2027',
    title: 'Autodesk Revit 2027 Full Version Windows/Mac (Instant Download)',
    shortTitle: 'Autodesk Revit 2027',
    subtitle: 'BIM Architectural & Structural Modeling',
    category: 'Architecture',
    price: 30.00,
    originalPrice: 490.00,
    currency: 'USD',
    version: '2027 Build 27.2',
    os: ['windows'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-slate-100 via-sky-50 to-blue-200',
      textColor: 'text-slate-900',
      accentColor: '#1d4ed8',
      logoText: 'AUTODESK REVIT 2027',
      badgeText: 'BIM ARCHITECTURE',
      illustrationType: 'wireframe-house'
    },
    deliveryDetails: {
      fileSize: '4.20 GB',
      downloadSpeed: 'Direct High-Speed CDN',
      sampleKey: 'RVT-2027-3199-7714-BIMPRO',
      installerUrl: 'https://cdn.soft-cad.com/installers/revit-2027-full.iso',
      format: 'ISO Installation Image'
    },
    description: 'Autodesk Revit 2027 is the multidisciplinary Building Information Modeling (BIM) software for architectural design, MEP engineering, structural design, and construction coordination.',
    features: [
      'Comprehensive Parametric 3D Architectural & MEP Modeling',
      'Automated Floorplans, Elevations, Sections and 3D Views',
      'Clash detection, schedule quantification, and materials takeoff',
      'Generative design exploration and realistic real-time raytracing',
      'Lifetime single-workstation activation included'
    ],
    systemRequirements: {
      os: '64-bit Microsoft Windows 10/11',
      cpu: 'Intel i-Series, Xeon, AMD Ryzen or equivalent (3.0 GHz+)',
      ram: '16 GB RAM minimum (32 GB recommended for complex models)',
      storage: '30 GB free disk space'
    },
    rating: 4.91,
    reviewsCount: 162,
    salesCount: 680,
    isBestSeller: true,
    isFeatured: false,
    createdAt: '2026-01-20'
  },
  {
    id: 'virtual-dj-2026-pro',
    title: 'VirtualDJ 2026 Pro Infinity Lifetime License (Instant Download)',
    shortTitle: 'VirtualDJ 2026 Pro Infinity',
    subtitle: 'Real-Time Stem Separation & DJ Mixing Engine',
    category: 'Audio & Music',
    price: 30.00,
    originalPrice: 299.00,
    currency: 'USD',
    version: '2026 Build b8140',
    os: ['windows', 'mac'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-neutral-950 via-red-950 to-black',
      textColor: 'text-white',
      accentColor: '#ef4444',
      logoText: 'VIRTUAL DJ 2026',
      badgeText: 'PRO INFINITY',
      illustrationType: 'disc'
    },
    deliveryDetails: {
      fileSize: '450 MB',
      downloadSpeed: 'Ultra Fast Direct CDN',
      sampleKey: 'VDJ-INF-2026-5512-INFINITY',
      installerUrl: 'https://cdn.soft-cad.com/installers/virtualdj-2026-pro-infinity.zip',
      format: 'Setup Package + License Authorization'
    },
    description: 'VirtualDJ 2026 Pro Infinity gives DJs breakthrough real-time audio stem separation, seamless video mixing, karaoke features, and compatibility with over 300 hardware DJ controllers.',
    features: [
      'Instant Real-Time Stem Separation (Vocals, Drums, Instruments, Bass)',
      'Hardware Controller Plug & Play for Pioneer, Denon, Numark, Hercules',
      'Advanced DVS (Digital Vinyl System) low-latency scratch engine',
      'Video and visualizer mixing with 4K output capabilities',
      'Infinite lifetime updates with no recurring subscription'
    ],
    systemRequirements: {
      os: 'Windows 10/11 64-bit or macOS 10.15 Catalina or newer',
      cpu: 'Intel Core i5 or AMD Ryzen or Apple Silicon (M1/M2/M3/M4)',
      ram: '4 GB minimum (8 GB recommended for video & stems)',
      storage: '1 GB free hard drive space'
    },
    rating: 4.94,
    reviewsCount: 230,
    salesCount: 1120,
    isBestSeller: true,
    isFeatured: false,
    createdAt: '2026-01-22'
  },
  {
    id: 'vectric-aspire-v12-5',
    title: 'Vectric Aspire V12.5 CNC 3D Relief Modeling Lifetime (Instant Download)',
    shortTitle: 'Vectric Aspire V12.5',
    subtitle: 'Design. Model. Create.',
    category: '3D & CAD',
    price: 30.00,
    originalPrice: 350.00,
    currency: 'USD',
    version: 'v12.508',
    os: ['windows'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-white via-amber-50 to-orange-100',
      textColor: 'text-slate-900',
      accentColor: '#ea580c',
      logoText: 'Aspire V12.5',
      badgeText: 'CNC ROUTER & LASER',
      illustrationType: 'cube'
    },
    deliveryDetails: {
      fileSize: '820 MB',
      downloadSpeed: 'High Speed Direct Mirror',
      sampleKey: 'ASP-125-9943-7721-CNCLIFE',
      installerUrl: 'https://cdn.soft-cad.com/installers/vectric-aspire-12.5.exe',
      format: 'Standalone Installer + 3D Clipart Collection'
    },
    description: 'Vectric Aspire V12.5 is the premier software solution for CNC routing, sign making, woodcarving, and 3D relief machining. Transform 2D sketches and photos into intricate 3D carvings with comprehensive toolpath generation.',
    features: [
      '3D Component Modeling from 2D Artwork and Vector Outlines',
      'Includes over 3,500+ free high-resolution 3D relief clip art models',
      'Advanced 3D Toolpaths: Roughing, Finishing, 3D Laser Machining & V-Carving',
      'Real-time material preview showing simulated carved wood, metal, acrylic',
      'Direct G-Code export for Mach3, GRBL, LinuxCNC, Shapeoko, Avid, X-Carve'
    ],
    systemRequirements: {
      os: 'Windows 10, 11 (64-bit)',
      cpu: '2 GHz Multi-Core Intel or AMD',
      ram: '4 GB RAM (8 GB or more recommended)',
      storage: '2 GB disk space for program (plus 8 GB for clip art)'
    },
    rating: 4.96,
    reviewsCount: 185,
    salesCount: 640,
    isBestSeller: true,
    isFeatured: false,
    createdAt: '2026-01-25'
  },
  {
    id: 'davinci-resolve-studio-19',
    title: 'Blackmagic DaVinci Resolve Studio 19 Lifetime License Full Version',
    shortTitle: 'DaVinci Resolve Studio 19',
    subtitle: 'Hollywood Grade Color, VFX & Editing',
    category: 'Video & VFX',
    price: 30.00,
    originalPrice: 295.00,
    currency: 'USD',
    version: '19.1 Studio Release',
    os: ['windows', 'mac', 'linux'],
    licenseType: 'Lifetime License',
    instantDelivery: true,
    boxStyle: {
      bgGradient: 'from-slate-900 via-indigo-950 to-neutral-900',
      textColor: 'text-white',
      accentColor: '#38bdf8',
      logoText: 'DaVinci Resolve 19',
      badgeText: 'STUDIO EDITION',
      illustrationType: 'waveform'
    },
    deliveryDetails: {
      fileSize: '4.10 GB',
      downloadSpeed: 'Global Akamai Edge CDN',
      sampleKey: 'DVRS-190-8842-1092-STUDIO',
      installerUrl: 'https://cdn.soft-cad.com/installers/davinci-resolve-studio-19.zip',
      format: 'Cross-Platform Studio Installer'
    },
    description: 'DaVinci Resolve Studio 19 combines professional 8K editing, color correction, visual effects (Fusion), and Fairlight audio post-production in a single high-performance software environment.',
    features: [
      'Support for up to 32K resolution and 120 fps with HDR grading',
      'DaVinci Neural Engine AI tools: Magic Mask, Voice Isolation, Speed Warp',
      'Multiple GPU acceleration and advanced noise reduction',
      'Full Fairlight Audio mixing console with 2,000 tracks',
      'Lifetime activation without periodic licensing prompts'
    ],
    systemRequirements: {
      os: 'Windows 10/11, macOS Sonoma/Ventura, or Linux CentOS 7.3+',
      cpu: 'Intel Core i7 / AMD Ryzen 7 or Apple Silicon M1 Pro/Max/Ultra',
      ram: '16 GB system memory (32 GB for 4K/Fusion)',
      storage: '4 GB disk space for application'
    },
    rating: 4.98,
    reviewsCount: 410,
    salesCount: 1980,
    isBestSeller: false,
    isFeatured: true,
    createdAt: '2026-01-28'
  }
];

export const CATEGORIES = [
  'All Software',
  '3D & CAD',
  'Audio & Music',
  'Graphic Design',
  'Architecture',
  'Video & VFX',
  'Utilities & OS'
] as const;

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, label: 'United States | USD $' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'European Union | EUR €' },
  { code: 'GBP', symbol: '£', rate: 0.79, label: 'United Kingdom | GBP £' },
  { code: 'CAD', symbol: 'CA$', rate: 1.36, label: 'Canada | CAD $' },
  { code: 'AUD', symbol: 'AU$', rate: 1.52, label: 'Australia | AUD $' }
];
