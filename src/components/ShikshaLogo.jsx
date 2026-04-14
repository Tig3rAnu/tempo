import React from 'react';

export function ShikshaLogo({ size = 'default', showText = true }) {
  const s = size === 'large' ? 48 : size === 'small' ? 28 : 36;
  const textSize = size === 'large' ? 'text-2xl' : size === 'small' ? 'text-base' : 'text-xl';

  return (
    <div className="logo-3d flex items-center gap-2.5 select-none">
      <div className="logo-3d-inner relative">
        <div className="absolute inset-0 rounded-2xl bg-orange-900/30 blur-md translate-y-2" style={{ width: s, height: s }} />
        <div className="absolute rounded-2xl bg-linear-to-br from-red-700 to-orange-800" style={{ width: s, height: s, transform: 'translate(1.5px, 3px)' }} />
        <div className="absolute rounded-2xl bg-linear-to-br from-red-600 to-orange-700" style={{ width: s, height: s, transform: 'translate(1px, 2px)' }} />
        <div
          className="relative rounded-2xl flex items-center justify-center overflow-hidden"
          style={{ width: s, height: s, background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 50%, #ff6b35 100%)' }}
        >
          <div className="logo-shine absolute inset-0 rounded-2xl z-10" />
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/30 to-transparent rounded-t-2xl" />
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-lg"
            style={{ width: s * 0.55, height: s * 0.55 }}
          >
            <path
              d="M28 12c0-3.5-3.5-6-8-6s-8 2.5-8 6c0 3 2.5 5 6 5.5l4 0.5c3.5 0.5 6 2.5 6 5.5 0 3.5-3.5 6.5-8 6.5s-8-3-8-6.5"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="4" r="2" fill="white" opacity="0.9" />
            <circle cx="20" cy="36" r="2" fill="white" opacity="0.9" />
          </svg>
        </div>
      </div>
      {showText && (
        <span className={`${textSize} font-black tracking-tight bg-linear-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent`}>
          Shiksha
        </span>
      )}
    </div>
  );
}
