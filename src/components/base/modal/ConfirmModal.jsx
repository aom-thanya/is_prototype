import React from 'react';
import { XClose } from '@untitledui/icons';
import { Button } from '../buttons/button';

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  icon: Icon
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col relative animate-in zoom-in-95">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <XClose className="w-5 h-5" />
        </button>

        <div className="p-6">
          {Icon && (
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-5">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {title}
          </h3>
          <p className="text-sm text-text-secondary">
            {description}
          </p>
        </div>
        
        <div className="px-6 py-5 bg-gray-50 border-t border-border flex items-center justify-end gap-3">
          <Button color="secondary" onClick={onClose}>{cancelText}</Button>
          <Button color="primary" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
}
