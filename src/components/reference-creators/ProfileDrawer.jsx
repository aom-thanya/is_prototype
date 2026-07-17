import React from 'react';
import { createPortal } from 'react-dom';
import { XClose } from '@untitledui/icons';
import { Button } from '../base/buttons/button';

import { useEffect, useState } from 'react';

export function ProfileDrawer({ isOpen, onClose, creator, isSelected, onToggleSelect }) {
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

  if (!shouldRender || !creator) return null;

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Creator Profile</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <XClose className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col items-center text-center mb-8">
            <img 
              src={creator.profileImageUrl || `https://ui-avatars.com/api/?name=${creator.username}`} 
              alt={creator.username} 
              className="w-24 h-24 rounded-full object-cover border border-gray-100 mb-4"
            />
            <h3 className="text-xl font-bold text-text-primary">{creator.displayName || creator.username}</h3>
            <p className="text-sm text-text-secondary mb-3">@{creator.username}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {creator.categories?.map(tag => (
                <span key={tag} className="text-xs bg-[#F4F3FF] text-brand-solid px-2 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
            
            {creator.similarityScore && (
              <div className="bg-[#F4F3FF] text-brand-solid px-4 py-2 rounded-lg text-sm font-semibold w-full max-w-[200px]">
                Visual Similarity: {creator.similarityScore}%
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl border border-border text-center">
              <div className="text-2xl font-bold text-text-primary mb-1">{formatNumber(creator.followerCount)}</div>
              <div className="text-xs text-text-secondary uppercase font-semibold">Followers</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-border text-center">
              <div className="text-2xl font-bold text-text-primary mb-1">{creator.engagementRate}%</div>
              <div className="text-xs text-text-secondary uppercase font-semibold">Eng. Rate</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">Platform</h4>
              <p className="text-sm text-text-secondary">{creator.platform}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">Content Style</h4>
              <p className="text-sm text-text-secondary">{creator.contentStyle}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">Audience Demographics</h4>
              <p className="text-sm text-text-secondary">{creator.audienceInfo}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-gray-50">
          <Button 
            color={isSelected ? 'secondary' : 'primary'} 
            className="w-full"
            onClick={() => onToggleSelect(creator)}
          >
            {isSelected ? 'Remove Selection' : 'Select as Reference'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
