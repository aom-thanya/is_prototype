import React from 'react';
import { Button } from '../base/buttons/button';

export function CompactCreatorCard({ creator, onRemove, onViewProfile }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="flex flex-col p-4 bg-white border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={creator.profileImageUrl || `https://ui-avatars.com/api/?name=${creator.username}`} 
          alt={creator.username} 
          className="w-12 h-12 rounded-full object-cover border border-gray-100"
        />
        <div className="flex-1 overflow-hidden">
          <h4 className="font-semibold text-text-primary text-sm truncate">
            {creator.displayName || creator.username}
          </h4>
          <p className="text-xs text-text-secondary truncate">@{creator.username}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
            <span className="font-medium text-gray-700">{creator.platform}</span>
            <span>•</span>
            <span>{formatNumber(creator.followerCount)}</span>
            <span>•</span>
            <span>ER {creator.engagementRate}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {creator.categories?.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto">
        <Button color="secondary" size="sm" onClick={() => onViewProfile(creator)}>
          View Profile
        </Button>
        <Button color="tertiary" size="sm" className="text-error hover:bg-error-50" onClick={() => onRemove(creator)}>
          Remove
        </Button>
      </div>
    </div>
  );
}
