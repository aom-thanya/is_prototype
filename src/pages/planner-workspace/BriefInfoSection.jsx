import React from 'react';

export default function BriefInfoSection({ brief }) {
  if (!brief) return null;
  const info = brief.briefInfo || {};

  return (
    <div className="space-y-6">
      {/* Campaign Setup */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-text-primary">Campaign Setup</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div><span className="text-text-secondary block mb-1">Project Name</span> <span className="font-medium text-text-primary">{brief.briefName || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Client / Brand</span> <span className="font-medium text-text-primary">{brief.clientName || '-'} / {brief.brand || '-'}</span></div>
          <div className="md:col-span-2"><span className="text-text-secondary block mb-1">Objectives</span> <span className="font-medium text-text-primary">{info.campaignObjective || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Created Date</span> <span className="font-medium text-text-primary">{brief.createdDate || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Budget</span> <span className="font-medium text-text-primary">{info.budget || '-'}</span></div>
        </div>
      </div>

      {/* Campaign Requirements */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-text-primary">Campaign Requirements</h3>
        </div>
        <div className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div><span className="text-text-secondary block mb-1">Target Audience</span> <span className="font-medium text-text-primary">{info.targetAudience || '-'}</span></div>
            <div><span className="text-text-secondary block mb-1">Platform</span> <span className="font-medium text-text-primary">{info.platform || '-'}</span></div>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <span className="text-text-secondary block mb-2">KPIs</span>
            <span className="font-medium text-text-primary">{info.kpi || '-'}</span>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <span className="text-text-secondary block mb-2">Scope of Work</span>
            <span className="font-medium text-text-primary">{info.scopeOfWork || '-'}</span>
          </div>
          {info.remark && (
            <div className="pt-2 border-t border-gray-100">
              <span className="text-text-secondary block mb-2">Remark from Sales</span>
              <span className="text-warning-900 bg-warning-50 p-3 rounded-lg block border border-warning-200">{info.remark}</span>
            </div>
          )}
        </div>
      </div>

      {/* Reference Creators */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-text-primary">Reference Creators</h3>
        </div>
        <div className="p-6 space-y-4 text-sm">
          {brief.referenceCreators && brief.referenceCreators.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {brief.referenceCreators.map(c => (
                <div key={c.creatorId} className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-2 pr-4 rounded-full">
                  <img src={c.profileImageUrl || `https://ui-avatars.com/api/?name=${c.username}`} className="w-6 h-6 rounded-full" />
                  <span className="font-medium text-text-primary">@{c.username}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">No reference creators selected</span>
          )}
        </div>
      </div>

    </div>
  );
}
