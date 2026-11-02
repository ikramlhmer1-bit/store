import React, { useState } from 'react';
import { DigitalProduct } from '../types/product';
import { SoftwareBox3D } from './SoftwareBox3D';
import { X, Plus, Sparkles, Upload, Check, AlertCircle, RefreshCw } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: DigitalProduct) => void;
}

const COLOR_PRESETS = [
  { name: 'Dark Pro Studio', bgGradient: 'from-zinc-950 via-neutral-900 to-black', textColor: 'text-white', accentColor: '#f97316', illustrationType: 'waveform' as const },
  { name: 'Architect Blueprint', bgGradient: 'from-slate-100 via-sky-50 to-blue-100', textColor: 'text-slate-900', accentColor: '#0284c7', illustrationType: 'wireframe-house' as const },
  { name: 'Crimson CAD', bgGradient: 'from-rose-50 via-red-50 to-amber-50', textColor: 'text-slate-900', accentColor: '#dc2626', illustrationType: 'wireframe-house' as const },
  { name: 'Deep Indigo VFX', bgGradient: 'from-slate-900 via-indigo-950 to-neutral-900', textColor: 'text-white', accentColor: '#38bdf8', illustrationType: 'waveform' as const },
  { name: 'Creative Spectrum', bgGradient: 'from-zinc-950 via-zinc-900 to-black', textColor: 'text-white', accentColor: '#22c55e', illustrationType: 'palette' as const },
  { name: 'CNC Amber Orange', bgGradient: 'from-white via-amber-50 to-orange-100', textColor: 'text-slate-900', accentColor: '#ea580c', illustrationType: 'cube' as const },
  { name: 'Club DJ Red', bgGradient: 'from-neutral-950 via-red-950 to-black', textColor: 'text-white', accentColor: '#ef4444', illustrationType: 'disc' as const },
];

const TEMPLATE_PRESETS = [
  {
    title: 'Ableton Live 12 Suite Lifetime (Instant Download) Windows and Mac',
    shortTitle: 'Ableton Live 12 Suite',
    subtitle: 'Music Creation and Live Performance DAW',
    category: 'Audio & Music' as const,
    price: 30.00,
    originalPrice: 499.00,
    version: '12.0.5 Suite',
    os: ['windows', 'mac'] as ('windows' | 'mac')[],
    boxPresetIndex: 0,
    fileSize: '2.8 GB',
    description: 'Ableton Live 12 Suite comes with a vast collection of instruments, sounds, kits and loops for creating any kind of music, plus full Max for Live integration.',
    features: [
      'Full Ableton Live 12 Suite with Unlimited Audio and MIDI Tracks',
      'Includes Wavetable, Roar, Meld, Operator, Sampler, and Granulator III',
      'Midi Transformations and Generators with microtonal tuning',
      'Full Offline Lifetime Activation - No subscription'
    ]
  },
  {
    title: 'Rhino 8 3D Full Version Lifetime (Instant Download) Windows and MacOS',
    shortTitle: 'Rhinoceros 8 3D',
    subtitle: 'NURBS Modeling for Industrial & Jewelry Design',
    category: '3D & CAD' as const,
    price: 30.00,
    originalPrice: 395.00,
    version: '8.4 Commercial',
    os: ['windows', 'mac'] as ('windows' | 'mac')[],
    boxPresetIndex: 1,
    fileSize: '1.8 GB',
    description: 'Rhino 8 delivers blazing fast modeling with SubD tools, ShrinkWrap, Grasshopper data types, and GPU raytracing for jewelers, marine architects, and industrial creators.',
    features: [
      'Parametric Modeling with Built-in Grasshopper',
      'SubD Freeform Organic Modeling and QuadRemesh',
      'Real-time Cycles Raytraced Viewport',
      'Lifetime Permanent Commercial License'
    ]
  },
  {
    title: 'Maxon Cinema 4D 2026 Full Version Lifetime (Instant Download) Mac/Win',
    shortTitle: 'Cinema 4D 2026',
    subtitle: '3D Animation, Motion Graphics & VFX',
    category: 'Video & VFX' as const,
    price: 30.00,
    originalPrice: 420.00,
    version: '2026.2 Studio',
    os: ['windows', 'mac'] as ('windows' | 'mac')[],
    boxPresetIndex: 3,
    fileSize: '3.4 GB',
    description: 'Cinema 4D is the 3D software of choice for motion designers and visual effects artists with Redshift rendering engine integration and rigid body dynamics.',
    features: [
      'MoGraph procedural animation toolset',
      'Integrated Redshift GPU rendering system',
      'Unified simulation system for cloth, ropes, and soft bodies',
      'Instant permanent activation key included'
    ]
  }
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  const [title, setTitle] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<DigitalProduct['category']>('3D & CAD');
  const [price, setPrice] = useState(30.00);
  const [originalPrice, setOriginalPrice] = useState(299.00);
  const [version, setVersion] = useState('2026 Full Version');
  const [osWindows, setOsWindows] = useState(true);
  const [osMac, setOsMac] = useState(true);
  const [osLinux, setOsLinux] = useState(false);
  const [licenseType, setLicenseType] = useState<DigitalProduct['licenseType']>('Lifetime License');
  const [fileSize, setFileSize] = useState('1.5 GB');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [customKey, setCustomKey] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedColorPreset, setSelectedColorPreset] = useState(0);
  const [description, setDescription] = useState('');
  const [feature1, setFeature1] = useState('Genuine Lifetime Activation for Windows and macOS');
  const [feature2, setFeature2] = useState('Instant Download link + License Key emailed immediately');
  const [feature3, setFeature3] = useState('No monthly renewal fees - 100% permanent access');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentPreset = COLOR_PRESETS[selectedColorPreset];

  // Preview product object
  const previewProduct: DigitalProduct = {
    id: 'preview-' + Date.now(),
    title: title.trim() || 'Software Title Full Version (Instant Download)',
    shortTitle: shortTitle.trim() || 'Software 2026',
    subtitle: subtitle.trim() || 'Design & Engineering Solution',
    category,
    price: Number(price) || 30.0,
    originalPrice: Number(originalPrice) || 299.0,
    currency: 'USD',
    version: version || '2026',
    os: [
      ...(osWindows ? ['windows' as const] : []),
      ...(osMac ? ['mac' as const] : []),
      ...(osLinux ? ['linux' as const] : [])
    ],
    licenseType,
    instantDelivery: true,
    boxStyle: {
      bgGradient: currentPreset.bgGradient,
      textColor: currentPreset.textColor,
      accentColor: currentPreset.accentColor,
      logoText: shortTitle.trim() || 'Software 2026',
      badgeText: category.toUpperCase(),
      illustrationType: currentPreset.illustrationType,
      customImageUrl: customImageUrl.trim() || undefined
    },
    deliveryDetails: {
      fileSize: fileSize || '1.2 GB',
      downloadSpeed: 'Instant Direct CDN',
      sampleKey: customKey || 'SCAD-2026-KEY8-PRO',
      installerUrl: downloadUrl || 'https://cdn.soft-cad.com/downloads/installer.zip',
      format: 'Direct Multi-OS Package'
    },
    description: description.trim() || 'Professional digital software suite with full feature set, comprehensive documentation, and lifetime digital license activation.',
    features: [feature1, feature2, feature3].filter(Boolean),
    systemRequirements: {
      os: 'Windows 10/11 or macOS 12 Monterey or newer',
      cpu: 'Multi-Core 2.0 GHz or Apple Silicon',
      ram: '8 GB RAM minimum',
      storage: '4 GB available drive space'
    },
    rating: 5.0,
    reviewsCount: 1,
    salesCount: 1,
    isBestSeller: true,
    createdAt: new Date().toISOString().split('T')[0]
  };

  const handleApplyTemplate = (template: typeof TEMPLATE_PRESETS[0]) => {
    setTitle(template.title);
    setShortTitle(template.shortTitle);
    setSubtitle(template.subtitle);
    setCategory(template.category);
    setPrice(template.price);
    setOriginalPrice(template.originalPrice);
    setVersion(template.version);
    setOsWindows(template.os.includes('windows'));
    setOsMac(template.os.includes('mac'));
    setSelectedColorPreset(template.boxPresetIndex);
    setFileSize(template.fileSize);
    setDescription(template.description);
    if (template.features[0]) setFeature1(template.features[0]);
    if (template.features[1]) setFeature2(template.features[1]);
    if (template.features[2]) setFeature3(template.features[2]);
    setErrorMsg('');
  };

  const handleGenerateKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setCustomKey(`SCAD-${segment()}-${segment()}-${segment()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a product title.');
      return;
    }
    if (!shortTitle.trim()) {
      setErrorMsg('Please enter a short software name for the 3D box spine and cover.');
      return;
    }
    if (!osWindows && !osMac && !osLinux) {
      setErrorMsg('Please select at least one supported operating system.');
      return;
    }

    const newId = shortTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    const generatedProduct: DigitalProduct = {
      ...previewProduct,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddProduct(generatedProduct);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold font-display">Add Digital Product</h2>
              <p className="text-xs text-slate-300">Create and publish software licenses for instant delivery</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Template Presets Bar */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick Templates:
          </span>
          {TEMPLATE_PRESETS.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyTemplate(t)}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-md font-medium text-slate-700 transition-colors cursor-pointer shadow-2xs"
            >
              + {t.shortTitle}
            </button>
          ))}
        </div>

        {/* Form Body with Live 3D Box Preview */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form Fields (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Product Listing Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. SketchUp Pro 2026 Full Version Lifetime (Instant Download)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Short Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Software Name (Box Spine) *
                  </label>
                  <input
                    type="text"
                    required
                    value={shortTitle}
                    onChange={(e) => setShortTitle(e.target.value)}
                    placeholder="e.g. Cinema 4D 2026"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Next-Gen 3D Animation"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Category & Version */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="3D & CAD">3D & CAD</option>
                    <option value="Audio & Music">Audio & Music</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Video & VFX">Video & VFX</option>
                    <option value="Utilities & OS">Utilities & OS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Release Version
                  </label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="e.g. 2026 v26.0"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Selling Price ($ USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-400 font-mono">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 text-xs border border-slate-300 rounded-lg font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Retail MSRP ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-400 font-mono">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* OS Compatibility Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Supported Platforms *
                </label>
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={osWindows}
                      onChange={(e) => setOsWindows(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Windows (10/11)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={osMac}
                      onChange={(e) => setOsMac(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>macOS (Intel & Apple Silicon)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={osLinux}
                      onChange={(e) => setOsLinux(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Linux</span>
                  </label>
                </div>
              </div>

              {/* 3D Box Color Theme Palette */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Software 3D Packaging Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColorPreset(idx)}
                      className={`p-2 rounded-lg text-left text-[11px] font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                        selectedColorPreset === idx
                          ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/50 text-indigo-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: preset.accentColor }}
                      />
                      <span className="truncate">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Digital Delivery File & License Key */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>Digital Delivery Configuration</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Instant Auto-Delivery</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Installer Download URL</label>
                    <input
                      type="text"
                      value={downloadUrl}
                      onChange={(e) => setDownloadUrl(e.target.value)}
                      placeholder="https://cdn.delvra.com/file.zip"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">File Size</label>
                    <input
                      type="text"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      placeholder="e.g. 1.85 GB"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="block text-[11px] text-slate-600">Sample / Master License Key</label>
                    <button
                      type="button"
                      onClick={handleGenerateKey}
                      className="text-[10px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      Generate Key
                    </button>
                  </div>
                  <input
                    type="text"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="SCAD-XXXX-XXXX-XXXX-LIFE"
                    className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-300 rounded-md bg-white"
                  />
                </div>
              </div>

              {/* Optional Custom Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Custom Cover Artwork Image URL (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://... or /assets/..."
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  {customImageUrl && (
                    <button
                      type="button"
                      onClick={() => setCustomImageUrl('')}
                      className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Live 3D Box Mockup Preview (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-between bg-slate-50/70 p-6 rounded-xl border border-slate-200">
              <div className="w-full text-center mb-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  Live 3D Retail Box Preview
                </span>
                <p className="text-[11px] text-slate-400">
                  This is how customers will see your digital software in the catalog
                </p>
              </div>

              {/* Live Rendered 3D Box */}
              <div className="my-auto py-4">
                <SoftwareBox3D product={previewProduct} size="md" isHovered={true} />
              </div>

              {/* Live Price Tag & Specs */}
              <div className="w-full bg-white p-3 rounded-lg border border-slate-200 text-xs shadow-2xs">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-semibold text-slate-900 truncate mr-2">{previewProduct.title}</span>
                  <span className="font-mono font-bold text-slate-900 shrink-0">${Number(price).toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-emerald-600 font-medium">✓ Instant Download</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSuccess}
              className={`px-6 py-2.5 rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                isSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Published to Store!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Publish Digital Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
