import React from 'react';
import { createPortal } from 'react-dom';
import { XClose } from '@untitledui/icons';
import { Button } from '../base/buttons/button';
import { Checkbox } from '../base/checkbox/checkbox';
import { NativeSelect } from '../base/select/select-native';

import { useEffect, useState } from 'react';

export function FilterDrawer({ isOpen, onClose }) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <XClose className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Follower Range</label>
            <NativeSelect 
              options={[
                {label: 'Any', value: ''},
                {label: '10K - 100K (Micro)', value: 'micro'},
                {label: '100K - 1M (Mid)', value: 'mid'},
                {label: '1M+ (Macro)', value: 'macro'}
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Minimum Engagement Rate</label>
            <NativeSelect 
              options={[
                {label: 'Any', value: ''},
                {label: '> 2%', value: '2'},
                {label: '> 5%', value: '5'},
                {label: '> 10%', value: '10'}
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
            <div className="space-y-2">
              {['Beauty', 'Fashion', 'Lifestyle', 'Entertainment', 'Food', 'Tech'].map(cat => (
                <Checkbox key={cat} label={cat} />
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Platform</label>
            <div className="space-y-2">
              {['TikTok', 'Instagram', 'YouTube', 'Facebook'].map(plat => (
                <Checkbox key={plat} label={plat} />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between gap-3 bg-gray-50">
          <Button color="secondary" onClick={onClose}>Clear All</Button>
          <Button color="primary" onClick={onClose}>Apply Filters</Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
