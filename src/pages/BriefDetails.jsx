import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit02 } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { Badge } from '../components/base/badges/badges';
import { BriefStepper } from '../components/brief/BriefStepper';
import BriefInfoSection from './planner-workspace/BriefInfoSection';

import { MOCK_PLANNER_DETAILS } from '../mockData/plannerDetails';

export default function BriefDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetch
    setData(MOCK_PLANNER_DETAILS);
  }, [id]);

  if (!data) return null;

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 relative">
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
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-text-tertiary">
              <span>Created by: {data.createdBy}</span>
              <span>Planner: {data.assignedPlanner}</span>
              <span>Buyer: {data.assignedBuyer}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button color="secondary" iconLeading={Edit02} onClick={() => navigate(`/create-brief`)}>Edit Brief</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pb-20 mt-8">
        <BriefInfoSection brief={data} />
      </div>
    </div>
  );
}
