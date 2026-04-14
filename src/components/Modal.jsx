import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full'
};

export default function Modal({ isOpen, onClose, title, children, size = 'lg', footer = null}) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full ${sizeClasses[size] || sizeClasses.lg} max-h-[90vh] flex flex-col overflow-hidden`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        {/* body - scrollable */}
        <div className="p-6 overflow-auto flex-grow">{children}</div>
        {/* footer area fixed */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
