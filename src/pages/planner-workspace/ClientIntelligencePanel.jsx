import React from 'react';
import { Zap, AlertTriangle, CheckCircle, XCircle } from '@untitledui/icons';

export default function ClientIntelligencePanel({ intelligence }) {
  if (!intelligence) return null;
  const { briefingStats, preferences, checklist, aiRecommendation, warning } = intelligence;

  return (
    <div className="space-y-6">
      
      {/* 1. AI Recommendation */}
      <div className="bg-brand-50 rounded-xl border border-brand-200 shadow-sm p-5">
        <h3 className="font-semibold text-brand-800 text-sm flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4" /> AI Recommendation
        </h3>
        <p className="text-sm text-brand-900 leading-relaxed">{aiRecommendation}</p>
      </div>

      {/* 2. Warning */}
      <div className="bg-error-50 rounded-xl border border-error-200 shadow-sm p-5">
        <h3 className="font-semibold text-error-800 text-sm flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4" /> Warning
        </h3>
        <p className="text-sm text-error-900 leading-relaxed">{warning}</p>
      </div>
      
      {/* 3. Client Briefing */}
      <div className="bg-surface rounded-xl border border-border shadow-sm p-5">
        <h3 className="font-semibold text-text-primary text-base mb-4">Client Briefing</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-text-tertiary uppercase">Past Campaigns</p>
            <p className="text-sm font-semibold">{briefingStats.totalCampaigns}</p>
          </div>
          <div>
            <p className="text-xs text-text-tertiary uppercase">Success Rate</p>
            <p className="text-sm font-semibold text-success-600">{briefingStats.campaignSuccessRate}</p>
          </div>
          <div>
            <p className="text-xs text-text-tertiary uppercase">Avg. Budget</p>
            <p className="text-sm font-semibold">{briefingStats.averageBudget}</p>
          </div>
          <div>
            <p className="text-xs text-text-tertiary uppercase">Avg. Approval</p>
            <p className="text-sm font-semibold">{briefingStats.averageApprovalTime}</p>
          </div>
        </div>
      </div>

      {/* 4. Client Preference */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-gray-50">
          <h3 className="font-semibold text-text-primary text-base">Client Preference</h3>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-success-700 flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4" /> Do
            </h4>
            <ul className="space-y-2">
              {preferences.do.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-success-500 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-error-700 flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4" /> Don't
            </h4>
            <ul className="space-y-2">
              {preferences.dont.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-error-500 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Proposal Checklist */}
      <div className="bg-surface rounded-xl border border-border shadow-sm p-5">
        <h3 className="font-semibold text-text-primary text-base mb-4">Proposal Checklist</h3>
        <ul className="space-y-3">
          {checklist.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={item.checked} 
                readOnly
                className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
              />
              <span className={`text-sm ${item.checked ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
