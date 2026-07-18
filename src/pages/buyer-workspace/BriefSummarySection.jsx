import React from 'react';
import { Badge } from '../../components/base/badges/badges';

export default function BriefSummarySection({ brief }) {
  if (!brief) return null;

  return (
    <div className="space-y-6">
      {/* Header Info */}
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

      {/* Campaign Setup */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-[17px] text-text-primary flex items-center gap-2">
            <span>🗂</span> Campaign Setup
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div><span className="text-text-secondary block mb-1">Project Name</span> <span className="font-medium text-text-primary">{brief.briefName || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Client / Brand</span> <span className="font-medium text-text-primary">{brief.clientName || '-'} / {brief.brand || '-'}</span></div>
          <div className="md:col-span-2"><span className="text-text-secondary block mb-1">Objectives</span> <span className="font-medium text-text-primary">{brief.briefInfo?.campaignObjective || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Created Date</span> <span className="font-medium text-text-primary">{brief.createdDate || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Budget</span> <span className="font-medium text-text-primary">{brief.briefInfo?.budget || '-'}</span></div>
        </div>
      </div>

      {/* Campaign Requirements */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-[17px] text-text-primary flex items-center gap-2">
            <span>🎯</span> Campaign Requirements
          </h3>
        </div>
        <div className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div><span className="text-text-secondary block mb-1">Target Audience</span> <span className="font-medium text-text-primary">{brief.briefInfo?.targetAudience || '-'}</span></div>
            <div><span className="text-text-secondary block mb-1">Platform</span> <span className="font-medium text-text-primary">{brief.briefInfo?.platform || '-'}</span></div>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <span className="text-text-secondary block mb-2">KPIs</span>
            <span className="font-medium text-text-primary">{brief.briefInfo?.kpi || '-'}</span>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <span className="text-text-secondary block mb-2">Scope of Work</span>
            <span className="font-medium text-text-primary">{brief.briefInfo?.scopeOfWork || '-'}</span>
          </div>
          {brief.briefInfo?.remark && (
            <div className="pt-2 border-t border-gray-100">
              <span className="text-text-secondary block mb-2">Remark</span>
              <span className="text-text-primary bg-gray-50 p-3 rounded-lg block border border-gray-100">{brief.briefInfo.remark}</span>
            </div>
          )}
        </div>
      </div>

      {/* Reference Creators */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-[17px] text-text-primary flex items-center gap-2">
            <span>👥</span> Reference Creators
          </h3>
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
