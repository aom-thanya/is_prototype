import React from 'react';
import { Badge } from '../../components/base/badges/badges';

export default function BriefSummarySection({ brief }) {
  if (!brief) return null;

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">{brief.briefName}</h2>
          <div className="flex items-center gap-3 mt-2 text-sm text-text-secondary">
            <span>{brief.briefNo}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="font-medium text-text-primary">{brief.clientName}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>Brand: {brief.brand}</span>
          </div>
        </div>
        <Badge color="sky" size="md">{brief.status}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Campaign Objective</h4>
          <p className="text-sm font-medium text-text-primary">{brief.briefInfo?.campaignObjective || '-'}</p>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Target Audience</h4>
          <p className="text-sm font-medium text-text-primary">{brief.briefInfo?.targetAudience || '-'}</p>
        </div>

        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Platform</h4>
          <p className="text-sm font-medium text-text-primary">{brief.briefInfo?.platform || '-'}</p>
        </div>
        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Budget</h4>
          <p className="text-sm font-medium text-brand-600">{brief.briefInfo?.budget || '-'}</p>
        </div>
        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">KPI</h4>
          <p className="text-sm font-medium text-text-primary">{brief.briefInfo?.kpi || '-'}</p>
        </div>

        <div className="md:col-span-3 bg-gray-50 p-4 rounded-lg border border-border/50 mt-2">
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Scope of Work</h4>
          <p className="text-sm text-text-primary">{brief.briefInfo?.scopeOfWork || '-'}</p>
        </div>
      </div>
    </div>
  );
}
