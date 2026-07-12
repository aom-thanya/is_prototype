import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import PageLoader from '../components/PageLoader';
import BriefSummarySection from './buyer-workspace/BriefSummarySection';
import RecommendationList from './buyer-workspace/RecommendationList';

export default function BuyerWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [brief, setBrief] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/workspace/buyer/${id || 'default'}`);
        const data = await res.json();
        setBrief(data.brief);
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error("Failed to fetch buyer workspace data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate('/brief')} />
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-title">Buyer Workspace</h1>
          <p className="text-sm text-text-secondary mt-1">Review brief and select influencers for Planner</p>
        </div>
      </div>

      {loading ? (
        <PageLoader message="AI กำลังค้นหาครีเอเตอร์ที่เหมาะสม..." />
      ) : (
        <>
          <BriefSummarySection brief={brief} />
          
          <div className="pt-4">
            <RecommendationList recommendations={recommendations} />
          </div>
        </>
      )}
    </div>
  );
}
