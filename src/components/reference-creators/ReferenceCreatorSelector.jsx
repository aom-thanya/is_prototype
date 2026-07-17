import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XClose, SearchSm, UploadCloud02, Sliders04 } from '@untitledui/icons';
import { Button } from '../base/buttons/button';
import { Input } from '../base/input/input';
import { CreatorCard } from './CreatorCard';
import { FilterDrawer } from './FilterDrawer';
import { ProfileDrawer } from './ProfileDrawer';
import { ConfirmModal } from '../base/modal/ConfirmModal';

export function ReferenceCreatorSelector({ isOpen, onClose, onConfirm, initialSelected = [] }) {
  const [activeTab, setActiveTab] = useState('username');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  
  // Temporary selection state
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [isTrayExpanded, setIsTrayExpanded] = useState(false);
  
  // Drawers
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [profileCreator, setProfileCreator] = useState(null);
  
  // Cancel Confirm
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  // Photo Search State
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isPhotoSearching, setIsPhotoSearching] = useState(false);

  // Sync initial selection when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedCreators([...initialSelected]);
      setResults([]);
      setSearchQuery('');
      setPhotoFile(null);
      setPhotoPreview(null);
      setActiveTab('username');
    }
  }, [isOpen, initialSelected]);

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(`http://localhost:8000/api/creators/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handlePhotoSearch = async () => {
    if (!photoFile) return;
    setIsPhotoSearching(true);
    try {
      const res = await fetch('http://localhost:8000/api/creators/search_by_photo', {
        method: 'POST'
      });
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setIsPhotoSearching(false);
    }
  };

  const toggleSelection = (creator) => {
    setSelectedCreators(prev => {
      const isSelected = prev.some(c => c.creatorId === creator.creatorId);
      if (isSelected) {
        return prev.filter(c => c.creatorId !== creator.creatorId);
      } else {
        return [...prev, { ...creator, selectedFrom: activeTab }];
      }
    });
  };

  const hasChanges = () => {
    const initialIds = initialSelected.map(c => c.creatorId).sort().join(',');
    const currentIds = selectedCreators.map(c => c.creatorId).sort().join(',');
    return initialIds !== currentIds;
  };

  const handleCancel = () => {
    if (hasChanges()) {
      setIsCancelConfirmOpen(true);
    } else {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 animate-in fade-in slide-in-from-bottom-8 duration-300 ease-out">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-border shadow-sm">
        <h2 className="text-xl font-bold text-text-primary">Select Reference Creators</h2>
        <button onClick={handleCancel} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <XClose className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left/Top Content: Search controls & Results */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          <div className="px-8 py-6 bg-white border-b border-border">
            <p className="text-sm text-text-secondary mb-6">
              Search and select creators to use as references for this brief.
            </p>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
              <button 
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'username' ? 'border-brand-solid text-brand-solid' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('username')}
              >
                Search by Username
              </button>
              <button 
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'photo' ? 'border-brand-solid text-brand-solid' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('photo')}
              >
                Search by Photo
              </button>
            </div>

            {/* Search Input Area */}
            {activeTab === 'username' && (
              <div className="flex gap-3 max-w-2xl">
                <div className="flex-1">
                  <Input 
                    placeholder="Enter TikTok username, handle, or creator name" 
                    value={searchQuery}
                    onChange={(val) => setSearchQuery(val)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <Button color="primary" onClick={handleSearch} isLoading={isSearching}>Search</Button>
              </div>
            )}

            {activeTab === 'photo' && (
              <div className="max-w-2xl">
                {!photoPreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                    <UploadCloud02 className="w-10 h-10 text-gray-400 mb-4" />
                    <p className="text-sm font-medium text-gray-700 mb-1">Upload a reference photo</p>
                    <p className="text-xs text-gray-500 mb-4 text-center">Upload a face photo to find creators with a similar appearance.</p>
                    <input type="file" accept="image/*" id="photo-upload" className="hidden" onChange={handlePhotoUpload} />
                    <label htmlFor="photo-upload" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer shadow-sm">
                      Upload Image
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-6 items-start p-4 border border-gray-200 rounded-xl bg-gray-50">
                    <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 mb-1">{photoFile.name}</p>
                      <div className="flex gap-3 mb-6">
                        <input type="file" accept="image/*" id="photo-replace" className="hidden" onChange={handlePhotoUpload} />
                        <label htmlFor="photo-replace" className="text-sm text-brand-solid hover:text-brand-solid_hover font-medium cursor-pointer">Replace</label>
                        <button onClick={() => { setPhotoFile(null); setPhotoPreview(null); setResults([]); }} className="text-sm text-error font-medium hover:text-error-600">Remove</button>
                      </div>
                      <Button color="primary" onClick={handlePhotoSearch} isLoading={isPhotoSearching}>Find Similar Creators</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-8 relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {results.length > 0 ? `${results.length} Results` : 'Results'}
              </h3>
              <Button color="secondary" size="sm" iconLeading={Sliders04} onClick={() => setIsFilterOpen(true)}>
                Filters
              </Button>
            </div>

            {isSearching || isPhotoSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-32">
                {results.map(creator => (
                  <CreatorCard 
                    key={creator.creatorId} 
                    creator={creator} 
                    isSelected={selectedCreators.some(c => c.creatorId === creator.creatorId)}
                    onToggleSelect={toggleSelection}
                    onViewProfile={setProfileCreator}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <SearchSm className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No creators found.</p>
                <p className="text-sm text-gray-400 mt-1">Try another search or adjust your filters.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Sticky Selected Tray & Footer */}
      <div className="bg-white border-t border-border shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] z-40">
        
        {/* Expanded Tray Content */}
        {isTrayExpanded && selectedCreators.length > 0 && (
          <div className="p-4 border-b border-gray-100 max-h-48 overflow-y-auto bg-gray-50 flex gap-4 overflow-x-auto">
            {selectedCreators.map(c => (
              <div key={c.creatorId} className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full border border-gray-200 shadow-sm whitespace-nowrap">
                <img src={c.profileImageUrl || `https://ui-avatars.com/api/?name=${c.username}`} className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium">@{c.username}</span>
                <button onClick={() => toggleSelection(c)} className="text-gray-400 hover:text-error ml-1"><XClose className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 px-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">Selected Creators ({selectedCreators.length})</span>
            {selectedCreators.length > 0 && (
              <button 
                onClick={() => setIsTrayExpanded(!isTrayExpanded)}
                className="text-sm text-brand-solid hover:text-brand-solid_hover font-medium"
              >
                {isTrayExpanded ? 'Hide' : 'Review'}
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button color="secondary" onClick={handleCancel}>Cancel</Button>
            <Button 
              color="primary" 
              isDisabled={selectedCreators.length === 0}
              onClick={() => onConfirm(selectedCreators)}
            >
              {selectedCreators.length === 0 
                ? 'Add References' 
                : `Add ${selectedCreators.length} Reference${selectedCreators.length > 1 ? 's' : ''}`}
            </Button>
          </div>
        </div>
      </div>

      {/* Drawers & Modals */}
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      
      <ProfileDrawer 
        isOpen={!!profileCreator} 
        onClose={() => setProfileCreator(null)}
        creator={profileCreator}
        isSelected={profileCreator && selectedCreators.some(c => c.creatorId === profileCreator.creatorId)}
        onToggleSelect={toggleSelection}
      />

      <ConfirmModal
        isOpen={isCancelConfirmOpen}
        onClose={() => setIsCancelConfirmOpen(false)}
        onConfirm={() => {
          setIsCancelConfirmOpen(false);
          onClose();
        }}
        title="Discard unsaved reference changes?"
        description="Your latest creator selections will not be saved."
        confirmText="Discard Changes"
        cancelText="Keep Editing"
      />

    </div>,
    document.body
  );
}
