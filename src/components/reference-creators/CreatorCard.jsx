import React from 'react';
import { Button } from '../base/buttons/button';
import { Check } from '@untitledui/icons';

export function CreatorCard({ creator, isSelected, onToggleSelect, onViewProfile }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div 
      className={`relative flex flex-col p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? 'border-brand-500 bg-brand-50 shadow-sm' 
          : 'border-border bg-surface hover:shadow-md'
      }`}
      onClick={() => onToggleSelect(creator)}
    >
      <div className="flex items-start justify-between mb-3">
        <div 
          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
            isSelected ? 'bg-brand-500 border-brand-500' : 'bg-white border-gray-300'
          }`}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
        {creator.similarityScore && (
          <div className="text-xs font-medium text-brand-700 bg-brand-100 px-2 py-1 rounded-full">
            Similarity {creator.similarityScore}%
          </div>
        )}
      </div>

      <div className="flex flex-col items-center text-center flex-1">
        <img 
          src={creator.profileImageUrl || `https://ui-avatars.com/api/?name=${creator.username}`} 
          alt={creator.username} 
          className="w-16 h-16 rounded-full object-cover border border-gray-100 mb-3"
        />
        <h4 className="font-semibold text-text-primary text-sm truncate w-full">
          {creator.displayName || creator.username}
        </h4>
        <p className="text-xs text-text-secondary truncate w-full">@{creator.username}</p>
        
        <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
          <span className="font-medium text-gray-700">{creator.platform}</span>
          <span>•</span>
          <span>{formatNumber(creator.followerCount)} followers</span>
        </div>
        <div className="text-xs text-text-secondary mt-1">
          ER <span className="font-medium text-gray-700">{creator.engagementRate}%</span>
        </div>

        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {creator.categories?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100/50">
        <Button 
          color="secondary" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile(creator);
          }}
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
