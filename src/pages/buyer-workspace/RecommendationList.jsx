import React, { useState, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Zap, AlertCircle, Users01, SearchSm, ArrowDown, ArrowUp, Trash01, ChevronLeft, ChevronRight } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { Badge } from '../../components/base/badges/badges';
import { ConfirmModal } from '../../components/base/modal/ConfirmModal';
import { ReferenceCreatorSelector } from '../../components/reference-creators/ReferenceCreatorSelector';
import { BuyerCreatorDrawer } from './BuyerCreatorDrawer';

const RecommendationList = forwardRef(({ recommendations = [], onCreatorsChange }, ref) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [creatorsList, setCreatorsList] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [drawerCreator, setDrawerCreator] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (onCreatorsChange) {
      onCreatorsChange(creatorsList.length);
    }
  }, [creatorsList.length, onCreatorsChange]);

  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  const handleAddCreators = (newCreators) => {
    const formattedCreators = newCreators.map(c => ({
      id: c.creatorId || c.id,
      creatorName: c.username || c.creatorName || c.displayName,
      profileImageUrl: c.profileImageUrl,
      platform: c.platform || 'TikTok',
      category: c.category || 'Creator',
      follower: c.follower || c.followerCount || 'N/A',
      engagementRate: c.engagementRate || 'N/A',
      estimatedPrice: c.estimatedPrice || 'N/A',
      buyerNote: '',
      tags: c.categories || ['Creator']
    }));
    
    setCreatorsList(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const added = formattedCreators.filter(f => !existingIds.has(f.id));
      return [...prev, ...added];
    });
    
    setIsSelectorOpen(false);
  };

  const handleSaveNote = (creatorId, note) => {
    setCreatorsList(prev => prev.map(c => c.id === creatorId ? { ...c, buyerNote: note } : c));
  };

  const handleRemoveCreator = (creatorId) => {
    setCreatorsList(prev => prev.filter(c => c.id !== creatorId));
    setSelectedRowIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(creatorId);
      return newSet;
    });
  };

  const handleBulkRemove = () => {
    setCreatorsList(prev => prev.filter(c => !selectedRowIds.has(c.id)));
    setSelectedRowIds(new Set());
  };

  const toggleSelectRow = (id) => {
    setSelectedRowIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedRowIds.size === currentTableData.length) {
      setSelectedRowIds(new Set());
    } else {
      setSelectedRowIds(new Set(currentTableData.map(c => c.id)));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleConfirmSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/workspace/buyer/${id || 'default'}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedCreators: creatorsList.map(c => c.id.toString()) })
      });
      if (response.ok) {
        setIsConfirmOpen(false);
        navigate(`/brief/${id}/planner`);
      } else {
        console.error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (creatorsList.length === 0) {
      setIsAlertOpen(true);
      return;
    }
    setIsConfirmOpen(true);
  };

  const parseNumber = (val) => {
    if (typeof val === 'number') return val;
    if (!val || val === 'N/A') return 0;
    const str = val.toString().toUpperCase().replace(/,/g, '');
    let num = parseFloat(str);
    if (str.includes('K')) num *= 1000;
    if (str.includes('M')) num *= 1000000;
    return isNaN(num) ? 0 : num;
  };

  const formatFollowerCount = (val) => {
    const num = parseNumber(val);
    if (num === 0) return val; // Fallback for 'N/A' or empty
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  };

  const filteredData = useMemo(() => {
    let data = creatorsList;
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      data = data.filter(c => c.creatorName.toLowerCase().includes(lowerQ));
    }
    if (sortConfig.key) {
      data = [...data].sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        
        if (sortConfig.key === 'follower' || sortConfig.key === 'engagementRate' || sortConfig.key === 'estimatedPrice') {
          valA = parseNumber(valA);
          valB = parseNumber(valB);
        } else {
          valA = valA ? valA.toString().toLowerCase() : '';
          valB = valB ? valB.toString().toLowerCase() : '';
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [creatorsList, searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 inline-block ml-1" /> : <ArrowDown className="w-3 h-3 inline-block ml-1" />;
  };

  return (
    <div className="pb-24 relative">
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-[17px] text-text-primary flex items-center gap-2">
            <Users01 className="w-5 h-5 text-gray-500" />
            Select Creators
          </h3>
          <Button color="primary" onClick={() => setIsSelectorOpen(true)}>+ Add Creators</Button>
        </div>

        {creatorsList.length === 0 ? (
          <div className="p-12 text-center">
            <Users01 className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-text-secondary mb-4">No creators found for this brief.</p>
            <Button color="primary" onClick={() => setIsSelectorOpen(true)}>+ Add Creators</Button>
          </div>
        ) : (
          <div className="flex flex-col">
          {/* Table Toolbar */}
          <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchSm className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search creators..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 w-full border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <Button color="secondary" size="sm">Filter</Button>
            </div>
            
            {selectedRowIds.size > 0 && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
                <span className="text-sm font-medium text-text-secondary">{selectedRowIds.size} selected</span>
                <Button color="secondary" size="sm" onClick={handleBulkRemove} className="!text-error hover:!bg-error-50 border-error-200">
                  <Trash01 className="w-4 h-4 mr-1" />
                  Remove Selected
                </Button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-border text-text-secondary font-medium">
                <tr>
                  <th className="px-6 py-3 w-10">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                      checked={currentTableData.length > 0 && selectedRowIds.size === currentTableData.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('creatorName')}>
                    Creator {renderSortIcon('creatorName')}
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('platform')}>
                    Platform {renderSortIcon('platform')}
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('follower')}>
                    Followers {renderSortIcon('follower')}
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('engagementRate')}>
                    ER {renderSortIcon('engagementRate')}
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('estimatedPrice')}>
                    Est. Price {renderSortIcon('estimatedPrice')}
                  </th>
                  <th className="px-6 py-3">Tags</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {currentTableData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No creators match your search.
                    </td>
                  </tr>
                ) : (
                  currentTableData.map(creator => {
                    const isSelected = selectedRowIds.has(creator.id);
                    return (
                      <tr 
                        key={creator.id} 
                        className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${isSelected ? 'bg-brand-50/30' : ''}`}
                        onClick={(e) => {
                          if (e.target.tagName === 'INPUT' || e.target.closest('button')) return;
                          setDrawerCreator(creator);
                        }}
                      >
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                            checked={isSelected}
                            onChange={() => toggleSelectRow(creator.id)}
                            onClick={e => e.stopPropagation()}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={creator.profileImageUrl || `https://ui-avatars.com/api/?name=${creator.creatorName}`} 
                              alt="" 
                              className="w-8 h-8 rounded-full border border-gray-100 object-cover"
                            />
                            <div>
                              <div className="font-medium text-text-primary">{creator.creatorName}</div>
                              {creator.buyerNote && (
                                <div className="text-[11px] text-brand-600 font-medium truncate max-w-[150px]">
                                  Note: {creator.buyerNote}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">{creator.platform}</td>
                        <td className="px-6 py-4 font-medium">{formatFollowerCount(creator.follower)}</td>
                        <td className="px-6 py-4 font-medium">{creator.engagementRate}</td>
                        <td className="px-6 py-4 font-medium">{creator.estimatedPrice}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {creator.tags?.slice(0, 2).map((tag, i) => (
                              <Badge key={i} color="gray" size="sm">{tag}</Badge>
                            ))}
                            {creator.tags?.length > 2 && <Badge color="gray" size="sm">+{creator.tags.length - 2}</Badge>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button color="tertiary" size="sm" onClick={() => setDrawerCreator(creator)}>
                            View Details
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between bg-white">
              <span className="text-sm text-text-secondary">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length} entries
              </span>
              <div className="flex gap-1">
                <Button 
                  color="tertiary" 
                  size="sm" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button 
                    key={i + 1}
                    color={currentPage === i + 1 ? 'secondary' : 'tertiary'}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? 'bg-gray-100' : ''}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button 
                  color="tertiary" 
                  size="sm" 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

      {/* Sticky Bottom Bar removed as per request to move button to header */}

      <BuyerCreatorDrawer 
        isOpen={!!drawerCreator}
        onClose={() => setDrawerCreator(null)}
        creator={drawerCreator}
        onSaveNote={handleSaveNote}
        onRemove={handleRemoveCreator}
      />

      <ReferenceCreatorSelector 
        isOpen={isSelectorOpen} 
        onClose={() => setIsSelectorOpen(false)} 
        onConfirm={handleAddCreators}
        initialSelected={[]}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="ส่งข้อมูลให้ Planner?"
        description={`คุณแน่ใจหรือไม่ที่จะส่งรายชื่อครีเอเตอร์ ${creatorsList.length} คนที่เลือกไว้ให้กับ Planner? ทาง Planner จะได้รับการแจ้งเตือนเพื่อตรวจสอบข้อมูลต่อไป`}
        confirmText={isSubmitting ? "กำลังส่ง..." : "ยืนยันการส่ง"}
        cancelText="ยกเลิก"
        icon={Zap}
      />

      <ConfirmModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => setIsAlertOpen(false)}
        title="ไม่สามารถส่งข้อมูลได้"
        description="กรุณาเลือกครีเอเตอร์อย่างน้อย 1 คนก่อนส่งให้ Planner"
        confirmText="ตกลง"
        hideCancel={true}
        icon={AlertCircle}
      />
    </div>
  );
});

export default RecommendationList;
