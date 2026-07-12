import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Zap, InfoCircle, AlertCircle } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { Badge } from '../../components/base/badges/badges';
import { Input } from '../../components/base/input/input';
import ExplainRecommendationModal from './ExplainRecommendationModal';
import { ConfirmModal } from '../../components/base/modal/ConfirmModal';

export default function RecommendationList({ recommendations = [] }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCreators, setSelectedCreators] = useState(new Set());
  const [explainModalCreator, setExplainModalCreator] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSelect = (id) => {
    const newSet = new Set(selectedCreators);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedCreators(newSet);
  };

  const handleConfirmSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/workspace/buyer/${id || 'default'}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selectedCreators: Array.from(selectedCreators)
        })
      });
      if (response.ok) {
        setIsConfirmOpen(false);
        navigate(`/brief/${id}/planner`);
      } else {
        console.error("Failed to submit recommendations");
      }
    } catch (error) {
      console.error("Error submitting recommendations:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (selectedCreators.size === 0) {
      setIsAlertOpen(true);
      return;
    }
    setIsConfirmOpen(true);
  };

  if (recommendations.length === 0) {
    return (
      <div className="p-12 text-center bg-surface border border-border rounded-xl">
        <Zap className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-text-secondary">No recommended influencers found for this brief.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Zap className="w-5 h-5 text-brand-500" />
          AI Influencer Recommendation
        </h3>
        <div className="flex gap-3">
          <Button color="secondary">Filters</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {recommendations.map((creator) => {
          const isSelected = selectedCreators.has(creator.id);
          return (
            <div 
              key={creator.id} 
              className={`bg-surface rounded-xl border transition-all ${isSelected ? 'border-brand-500 shadow-md ring-1 ring-brand-500' : 'border-border shadow-sm hover:shadow-md'}`}
            >
              <div className="p-5 flex items-start gap-4">
                {/* Checkbox / Selection */}
                <div className="pt-1">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500 cursor-pointer"
                    checked={isSelected}
                    onChange={() => toggleSelect(creator.id)}
                  />
                </div>

                {/* Profile Image placeholder */}
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 font-medium text-lg">
                  {creator.creatorName.charAt(0)}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-text-primary truncate">{creator.creatorName}</h4>
                    <Badge color="success" size="sm">{creator.overallMatchScore}% Match</Badge>
                  </div>
                  <p className="text-sm text-text-secondary truncate">{creator.platform} • {creator.category}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-text-tertiary">Followers</p>
                      <p className="text-sm font-medium">{creator.follower}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary">ER</p>
                      <p className="text-sm font-medium">{creator.engagementRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary">Price</p>
                      <p className="text-sm font-medium">{creator.estimatedPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Reason Summary */}
              <div className="px-5 py-4 border-t border-border bg-brand-50/50">
                <p className="text-sm text-text-secondary line-clamp-2">
                  <strong className="text-text-primary font-medium">AI Note:</strong> {creator.reasonSummary}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <button 
                    onClick={() => setExplainModalCreator(creator)}
                    className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <InfoCircle className="w-3.5 h-3.5" /> Why recommended?
                  </button>
                  <span className="text-xs text-text-tertiary">Client Pref. Match: {creator.clientPreferenceMatchScore}%</span>
                </div>
              </div>

              {/* Action area (if selected, show note input) */}
              {isSelected && (
                <div className="p-4 border-t border-border bg-gray-50 animate-in fade-in slide-in-from-top-2">
                  <Input 
                    placeholder="Add buyer note for planner..." 
                    size="sm" 
                  />
                  <div className="flex gap-2 mt-3">
                    <Badge color="blue" size="sm">Preferred</Badge>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Bar for Submit */}
      <div className="sticky bottom-4 mt-8 bg-white/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-lg flex items-center justify-between z-40">
        <div>
          <h4 className="font-medium text-text-primary">Selected Creators</h4>
          <p className="text-sm text-text-secondary">{selectedCreators.size} influencer(s) chosen</p>
        </div>
        <Button color="primary" onClick={handleSubmit} disabled={selectedCreators.size === 0}>
          Submit to Planner
        </Button>
      </div>

      {/* Modal */}
      <ExplainRecommendationModal 
        isOpen={!!explainModalCreator}
        onClose={() => setExplainModalCreator(null)}
        creator={explainModalCreator}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="ส่งข้อมูลให้ Planner?"
        description={`คุณแน่ใจหรือไม่ที่จะส่งรายชื่อครีเอเตอร์ ${selectedCreators.size} คนที่เลือกไว้ให้กับ Planner? ทาง Planner จะได้รับการแจ้งเตือนเพื่อตรวจสอบข้อมูลต่อไป`}
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
}
