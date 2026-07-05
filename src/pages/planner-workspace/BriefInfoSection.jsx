import React from 'react';

export default function BriefInfoSection({ brief }) {
  if (!brief) return null;
  const info = brief.briefInfo || {};

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
      <h3 className="font-semibold text-text-primary text-lg border-b border-border pb-3">Brief Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Campaign Objective</h4>
          <p className="text-sm text-text-primary">{info.campaignObjective || '-'}</p>
        </div>
        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Target Audience</h4>
          <p className="text-sm text-text-primary">{info.targetAudience || '-'}</p>
        </div>
        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Platform</h4>
          <p className="text-sm text-text-primary">{info.platform || '-'}</p>
        </div>
        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Budget</h4>
          <p className="text-sm text-brand-600 font-medium">{info.budget || '-'}</p>
        </div>
        <div>
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">KPI</h4>
          <p className="text-sm text-text-primary">{info.kpi || '-'}</p>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Scope of Work</h4>
          <p className="text-sm text-text-primary">{info.scopeOfWork || '-'}</p>
        </div>
        <div className="md:col-span-2 bg-warning-50 p-3 rounded-lg border border-warning-200 mt-2">
          <h4 className="text-xs font-medium text-warning-800 uppercase tracking-wider mb-1">Remark from Sales</h4>
          <p className="text-sm text-warning-900">{info.remark || '-'}</p>
        </div>
      </div>
    </div>
  );
}
