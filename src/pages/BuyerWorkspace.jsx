import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send01 } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { Badge } from '../components/base/badges/badges';
import RecommendationList from './buyer-workspace/RecommendationList';
import { BriefStepper } from '../components/brief/BriefStepper';
import ClientIntelligencePanel from './planner-workspace/ClientIntelligencePanel';
import BuyerWorkspaceSkeleton from './buyer-workspace/BuyerWorkspaceSkeleton';
import { MOCK_PLANNER_DETAILS } from '../mockData/plannerDetails';
import { MOCK_BUYER_RECOMMENDATIONS } from '../mockData/buyerRecommendations';

export default function BuyerWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [brief, setBrief] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCount, setSelectedCount] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    // Simulate fetch with mock data
    setLoading(true);
    setTimeout(() => {
      setBrief(MOCK_PLANNER_DETAILS);
      setRecommendations(MOCK_BUYER_RECOMMENDATIONS.recommendedCreators);
      setLoading(false);
    }, 1500);
  }, [id]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 relative animate-fade-in">
      <BriefStepper />
      
      {/* Header */}
      {!loading && brief && (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-surface p-6 rounded-xl border border-border shadow-sm mt-8 mb-6">
          <div className="flex items-start gap-4">
            <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate('/brief')} className="mt-1" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-text-primary font-title">{brief.briefName}</h1>
                <Badge color="sky" size="lg">{brief.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-text-secondary">
                <span>{brief.briefNo}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="font-medium text-text-primary">{brief.clientName} ({brief.brand})</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>Due: <span className="font-medium text-error-600">{brief.dueDate}</span></span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-text-tertiary">
                <span>Created by: {brief.createdBy}</span>
                <span>Planner: {brief.assignedPlanner}</span>
                <span>Buyer: {brief.assignedBuyer}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button 
              color="primary" 
              iconLeading={Send01} 
              onClick={() => listRef.current?.handleSubmit()} 
              disabled={selectedCount === 0}
            >
              Submit to Planner
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <BuyerWorkspaceSkeleton />
      ) : (
        <div className="pt-4 grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column: Reference Creators & Client Intelligence */}
          <div className="xl:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-semibold text-[17px] text-text-primary flex items-center gap-2">
                  <span>👥</span> Reference Creators
                </h3>
              </div>
              <div className="p-6 space-y-4 text-sm">
                {brief.referenceCreators && brief.referenceCreators.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {brief.referenceCreators.map(c => (
                      <div key={c.creatorId} className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 pr-4 rounded-full">
                        <img src={c.profileImageUrl || `https://ui-avatars.com/api/?name=${c.username}`} className="w-8 h-8 rounded-full" />
                        <span className="font-medium text-text-primary truncate">@{c.username}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">No reference creators selected</span>
                )}
              </div>
            </div>
            
            <ClientIntelligencePanel intelligence={brief.clientIntelligence} />
            </div>
          </div>
          
          {/* Right Column: Recommendation List */}
          <div className="xl:col-span-3">
            <RecommendationList 
              ref={listRef} 
              recommendations={recommendations} 
              onCreatorsChange={setSelectedCount} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
