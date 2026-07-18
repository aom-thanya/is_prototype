import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XClose } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { TextArea } from '../../components/base/textarea/textarea';

export function BuyerCreatorDrawer({ isOpen, onClose, creator, onSaveNote, onRemove }) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setNote(creator?.buyerNote || '');
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, creator]);

  if (!shouldRender || !creator) return null;

  const handleSave = () => {
    onSaveNote(creator.id, note);
    onClose();
  };

  const handleRemove = () => {
    onRemove(creator.id);
    onClose();
  };

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    if (typeof num === 'string') return num;
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
          <h2 className="text-lg font-semibold text-text-primary">Creator Details</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <XClose className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col items-center text-center mb-8">
            <img 
              src={creator.profileImageUrl || `https://ui-avatars.com/api/?name=${creator.creatorName}`} 
              alt={creator.creatorName} 
              className="w-24 h-24 rounded-full object-cover border border-gray-100 mb-4"
            />
            <h3 className="text-xl font-bold text-text-primary">{creator.creatorName}</h3>
            <p className="text-sm text-text-secondary mb-3">{creator.platform} • {creator.category}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl border border-border text-center">
              <div className="text-2xl font-bold text-text-primary mb-1">{formatNumber(creator.follower)}</div>
              <div className="text-xs text-text-secondary uppercase font-semibold">Followers</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-border text-center">
              <div className="text-2xl font-bold text-text-primary mb-1">{creator.engagementRate}</div>
              <div className="text-xs text-text-secondary uppercase font-semibold">Eng. Rate</div>
            </div>
          </div>
          
          <div className="mb-8">
             <div className="p-4 bg-gray-50 rounded-xl border border-border text-center">
              <div className="text-xl font-bold text-text-primary mb-1">{creator.estimatedPrice}</div>
              <div className="text-xs text-text-secondary uppercase font-semibold">Est. Price</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text-primary">Buyer Note</h4>
            <TextArea 
              placeholder="Add note for planner (e.g. why this creator is selected, special instructions...)"
              value={note}
              onChange={(val) => setNote(val)}
              rows={4}
            />
          </div>
        </div>

        <div className="p-6 border-t border-border bg-gray-50 flex gap-3">
          <Button 
            color="secondary" 
            className="flex-1 !text-error hover:!bg-error-50"
            onClick={handleRemove}
          >
            Remove Creator
          </Button>
          <Button 
            color="primary" 
            className="flex-1"
            onClick={handleSave}
          >
            Save Note
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
