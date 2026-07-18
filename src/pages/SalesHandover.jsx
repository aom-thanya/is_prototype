import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { Badge } from '../components/base/badges/badges';
import { BriefStepper } from '../components/brief/BriefStepper';

import { MOCK_PLANNER_DETAILS } from '../mockData/plannerDetails';

export default function SalesHandover() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetch
    setData(MOCK_PLANNER_DETAILS);
  }, [id]);

  if (!data) return null;

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 relative animate-fade-in">
      <BriefStepper />
      
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-surface p-6 rounded-xl border border-border shadow-sm mt-8">
        <div className="flex items-start gap-4">
          <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate('/brief')} className="mt-1" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-text-primary font-title">{data.briefName}</h1>
              <Badge color="sky" size="lg">{data.status}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-text-secondary">
              <span>{data.briefNo}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="font-medium text-text-primary">{data.clientName} ({data.brand})</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Due: <span className="font-medium text-error-600">{data.dueDate}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Placeholder */}
      <div className="flex flex-col items-center justify-center py-32 text-center bg-surface border border-border rounded-xl mt-8 border-dashed">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-gray-400 text-2xl font-bold">4</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Sales Handover</h2>
        <p className="text-gray-500 max-w-md">This section is currently under construction. It will contain the final handover details for the sales team.</p>
      </div>
    </div>
  );
}
