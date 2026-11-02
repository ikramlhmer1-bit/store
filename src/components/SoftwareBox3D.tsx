import React from 'react';
import { DigitalProduct } from '../types/product';
import { Box, Layers, Music, Scissors, Palette, Disc, Disc3, ShieldCheck } from 'lucide-react';

interface SoftwareBox3DProps {
  product: DigitalProduct;
  size?: 'sm' | 'md' | 'lg';
  isHovered?: boolean;
}

export const SoftwareBox3D: React.FC<SoftwareBox3DProps> = ({
  product,
  size = 'md',
  isHovered = false
}) => {
  const { boxStyle, os } = product;

  // Scale dimensions based on size
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1.0;
  const boxWidth = Math.round(155 * scale);
  const boxHeight = Math.round(215 * scale);
  const spineWidth = Math.round(36 * scale);

  const isDark = boxStyle.textColor.includes('white') || boxStyle.bgGradient.includes('zinc-900') || boxStyle.bgGradient.includes('black') || boxStyle.bgGradient.includes('blue-950');

  // Render thematic center illustration
  const renderIllustration = () => {
    switch (boxStyle.illustrationType) {
      case 'wireframe-house':
        return (
          <div className="relative w-full h-24 my-1 flex items-center justify-center overflow-hidden">
            {/* 3D Blueprint wireframe house grid */}
            <svg viewBox="0 0 100 80" className="w-full h-full opacity-85">
              <defs>
                <linearGradient id={`grad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={boxStyle.accentColor} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={boxStyle.accentColor} stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Perspective grid floor */}
              <path d="M 10 70 L 90 70 L 75 50 L 25 50 Z" fill={`url(#grad-${product.id})`} stroke={boxStyle.accentColor} strokeWidth="0.75" />
              <line x1="30" y1="70" x2="38" y2="50" stroke={boxStyle.accentColor} strokeWidth="0.5" strokeDasharray="1,1" />
              <line x1="50" y1="70" x2="50" y2="50" stroke={boxStyle.accentColor} strokeWidth="0.5" strokeDasharray="1,1" />
              <line x1="70" y1="70" x2="62" y2="50" stroke={boxStyle.accentColor} strokeWidth="0.5" strokeDasharray="1,1" />
              {/* House 3D outline */}
              <polygon points="35,50 35,28 50,15 65,28 65,50" fill="none" stroke={boxStyle.accentColor} strokeWidth="1.5" />
              <polygon points="50,15 65,28 80,24 65,11" fill="none" stroke={boxStyle.accentColor} strokeWidth="1" opacity="0.6" />
              <polygon points="65,28 65,50 80,44 80,24" fill="none" stroke={boxStyle.accentColor} strokeWidth="1" opacity="0.6" />
              {/* Windows and doors */}
              <rect x="44" y="34" width="12" height="16" fill="none" stroke={boxStyle.accentColor} strokeWidth="1" />
              <line x1="50" y1="34" x2="50" y2="50" stroke={boxStyle.accentColor} strokeWidth="0.75" />
              <rect x="37" y="32" width="5" height="7" fill={boxStyle.accentColor} fillOpacity="0.3" stroke={boxStyle.accentColor} strokeWidth="0.5" />
              <rect x="58" y="32" width="5" height="7" fill={boxStyle.accentColor} fillOpacity="0.3" stroke={boxStyle.accentColor} strokeWidth="0.5" />
            </svg>
          </div>
        );
      case 'waveform':
        return (
          <div className="relative w-full h-24 my-1 flex flex-col items-center justify-center">
            {/* Glowing audio waveform visualization */}
            <div className="flex items-center justify-center gap-1 w-full px-3 h-16">
              {[30, 60, 95, 45, 80, 100, 70, 85, 40, 90, 65, 35, 55, 90, 75, 45, 25].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    backgroundColor: boxStyle.accentColor,
                    opacity: 0.4 + (h / 100) * 0.6,
                    boxShadow: `0 0 6px ${boxStyle.accentColor}80`
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] font-mono tracking-widest uppercase opacity-70" style={{ color: boxStyle.accentColor }}>
                24-BIT 192KHZ PRO AUDIO
              </span>
            </div>
          </div>
        );
      case 'palette':
        return (
          <div className="relative w-full h-24 my-1 flex items-center justify-center">
            {/* Vivid colorful vector splash graphic */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full blur-md opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, #ef4444, #f59e0b, #10b981, #06b6d4, #8b5cf6, #ec4899, #ef4444)'
                }}
              />
              <div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6 border border-white/20"
                style={{
                  background: 'conic-gradient(from 180deg, #f43f5e, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #f43f5e)'
                }}
              >
                <Palette className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            </div>
          </div>
        );
      case 'disc':
        return (
          <div className="relative w-full h-24 my-1 flex items-center justify-center">
            {/* DJ Jogwheel Turntable */}
            <div className="relative w-20 h-20 rounded-full border-4 border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-2xl">
              <div className="absolute inset-2 rounded-full border border-zinc-700 opacity-60" />
              <div className="absolute inset-4 rounded-full border border-red-500/40" />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shadow-inner"
                style={{ backgroundColor: boxStyle.accentColor }}
              >
                <Disc3 className="w-4 h-4 text-white animate-spin-slow" />
              </div>
            </div>
          </div>
        );
      case 'cube':
        return (
          <div className="relative w-full h-24 my-1 flex items-center justify-center">
            {/* 3D CNC carved relief relief cube */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center border-2 shadow-md transform rotate-12"
                style={{
                  borderColor: boxStyle.accentColor,
                  backgroundColor: `${boxStyle.accentColor}15`
                }}
              >
                <Box className="w-8 h-8" style={{ color: boxStyle.accentColor }} />
              </div>
            </div>
          </div>
        );
      case 'scissors':
        return (
          <div className="relative w-full h-24 my-1 flex items-center justify-center">
            <div className="relative w-16 h-16 rounded-full bg-blue-900/40 border border-sky-400/30 flex items-center justify-center">
              <Scissors className="w-8 h-8 text-sky-400 transform -rotate-45" />
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-24 my-1 flex items-center justify-center">
            <Layers className="w-10 h-10 opacity-70" style={{ color: boxStyle.accentColor }} />
          </div>
        );
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center justify-center select-none py-2 group/box">
      {/* 3D Box Container with realistic perspective */}
      <div
        className="relative transition-all duration-300 ease-out transform group-hover/box:-translate-y-2"
        style={{
          transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'none'
        }}
      >
        {/* Soft realistic floor shadow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-5 rounded-full pointer-events-none transition-all duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.15) 50%, transparent 75%)',
            filter: 'blur(4px)',
            transform: `translateX(-45%) scale(${isHovered ? 1.1 : 1.0})`
          }}
        />

        <div className="flex items-stretch perspective-1000">
          {/* LEFT SPINE: Realistic angled side of software box */}
          <div
            className={`relative rounded-l-xs flex flex-col justify-between py-3 px-1.5 shadow-xl overflow-hidden border-r border-black/15 bg-gradient-to-r ${boxStyle.bgGradient}`}
            style={{
              width: `${spineWidth}px`,
              height: `${boxHeight}px`,
              transform: 'rotateY(-28deg) skewY(-8deg) scaleY(0.97)',
              transformOrigin: 'right center',
              filter: 'brightness(0.85) contrast(1.05)'
            }}
          >
            {/* Top spine logo */}
            <div className="flex flex-col items-center">
              <div
                className="w-3.5 h-3.5 rounded flex items-center justify-center mb-1 text-[8px] font-bold shadow-sm"
                style={{ backgroundColor: boxStyle.accentColor, color: '#ffffff' }}
              >
                {product.shortTitle.charAt(0)}
              </div>
              <div
                className="text-[7px] font-bold tracking-widest uppercase opacity-60 line-clamp-1"
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              >
                {product.licenseType === 'Lifetime License' ? 'LIFETIME' : 'PRO'}
              </div>
            </div>

            {/* Vertical spine title */}
            <div className="flex-1 flex items-center justify-center overflow-hidden py-1">
              <span
                className={`text-[9px] font-bold tracking-wider uppercase whitespace-nowrap opacity-90 transform -rotate-90 select-none ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
                style={{ width: `${boxHeight - 70}px`, textAlign: 'center' }}
              >
                {product.shortTitle}
              </span>
            </div>

            {/* Bottom spine platform icons */}
            <div className="flex flex-col items-center gap-1 opacity-70">
              <span className="text-[7px] font-mono tracking-tighter" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                {product.version.split(' ')[0]}
              </span>
              <div className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: boxStyle.accentColor }} />
            </div>

            {/* Spine lighting sheen reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-black/25 pointer-events-none" />
          </div>

          {/* FRONT COVER: Realistic angled front of software box */}
          <div
            className={`relative rounded-r-sm flex flex-col justify-between p-3.5 shadow-2xl overflow-hidden border border-black/10 bg-gradient-to-br ${boxStyle.bgGradient}`}
            style={{
              width: `${boxWidth}px`,
              height: `${boxHeight}px`,
              transform: 'rotateY(10deg) skewY(2deg)',
              transformOrigin: 'left center'
            }}
          >
            {/* Top Header Row of Front Cover */}
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className="text-[7px] font-bold tracking-widest uppercase px-1 py-0.5 rounded-xs"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)',
                    color: boxStyle.accentColor
                  }}
                >
                  {boxStyle.badgeText || product.category}
                </span>

                <div className="flex items-center gap-1 text-[8px] font-medium opacity-75" style={{ color: isDark ? '#fff' : '#000' }}>
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
                  <span>100% GENUINE</span>
                </div>
              </div>

              {/* Main Software Title on Cover */}
              <h4
                className={`font-display font-extrabold text-sm leading-tight tracking-tight line-clamp-2 ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                {boxStyle.logoText || product.shortTitle}
              </h4>

              {product.subtitle && (
                <p
                  className="text-[9px] font-normal tracking-tight opacity-75 mt-0.5 line-clamp-1"
                  style={{ color: isDark ? '#e2e8f0' : '#475569' }}
                >
                  {product.subtitle}
                </p>
              )}
            </div>

            {/* Visual Center Graphic or Custom Artwork */}
            {boxStyle.customImageUrl ? (
              <div className="relative w-full h-24 my-1 rounded overflow-hidden shadow-inner bg-black/10">
                <img
                  src={boxStyle.customImageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to illustration if custom image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            ) : (
              renderIllustration()
            )}

            {/* Bottom Meta on Cover */}
            <div className="border-t pt-1.5" style={{ borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }}>
              <div className="flex items-center justify-between text-[8px]">
                <div className="flex items-center gap-1.5 opacity-85" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>
                  {os.includes('windows') && (
                    <span className="font-semibold flex items-center gap-0.5">
                      <svg className="w-2.5 h-2.5" viewBox="0 0 88 88" fill="currentColor">
                        <path d="M0 12.402l35.689-4.86v35.435H0V12.402zm35.689 39.463v35.435L0 82.44V51.865h35.689zm5.311-40.185L88 4.298v38.679H41v-31.274zm47 40.185L41 51.865v38.679l47-6.529V51.865z" />
                      </svg>
                      Win
                    </span>
                  )}
                  {os.includes('mac') && (
                    <span className="font-semibold flex items-center gap-0.5">
                      <svg className="w-2.5 h-2.5" viewBox="0 0 170 170" fill="currentColor">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.76-7.87-12.23-14.35-6.55-9.52-11.75-20.73-15.6-33.64-3.85-12.9-5.78-25.04-5.78-36.42 0-14.19 3.52-26.04 10.57-35.56 7.05-9.52 16.03-14.37 26.94-14.56 5.26 0 10.96 1.34 17.1 4.02 6.13 2.68 10.15 4.07 12.06 4.18 1.54 0 5.8-1.47 12.78-4.41 6.98-2.94 13.06-4.22 18.24-3.85 13.9.73 24.8 5.76 32.7 15.09-12.18 7.39-18.17 17.43-17.97 30.12.2 10.18 4.13 18.73 11.8 25.66 7.67 6.93 16.94 10.83 27.81 11.7-2.34 7.04-5.36 14.54-9.06 22.5zM119.22 31.85c0-7.39 2.63-14.35 7.89-20.88 5.26-6.53 11.78-10.52 19.57-11.97.13 1.01.2 1.94.2 2.8 0 7.32-2.78 14.4-8.34 21.24-5.56 6.84-12.33 10.74-20.32 11.71-.27-.9-.4-1.87-.4-2.9z" />
                      </svg>
                      Mac
                    </span>
                  )}
                  {os.includes('linux') && <span className="font-semibold">Linux</span>}
                </div>

                <span
                  className="font-mono text-[8px] font-bold tracking-tight px-1 py-0.2 rounded"
                  style={{
                    backgroundColor: boxStyle.accentColor,
                    color: '#ffffff'
                  }}
                >
                  DIGITAL
                </span>
              </div>
            </div>

            {/* Glossy top-left highlight sheen reflection */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
