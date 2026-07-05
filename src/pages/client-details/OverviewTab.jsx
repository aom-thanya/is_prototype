import React from 'react';
import { Zap } from '@untitledui/icons';

export default function OverviewTab({ client }) {
  if (!client) return null;

  return (
    <div className="space-y-6">
      {/* Section 3: AI Client Summary */}
      <div className="bg-brand-50 p-6 rounded-xl border border-brand-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Zap className="w-24 h-24 text-brand-600" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-brand-600" />
            <h3 className="font-semibold text-brand-900">AI Client Summary</h3>
          </div>
          <p className="text-brand-800 text-sm leading-relaxed max-w-4xl">
            {client.aiSummary}
          </p>
        </div>
      </div>

      {/* Section 2: KPI Summary Cards */}
      <div>
        <h3 className="font-semibold text-text-primary mb-3">KPI Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col justify-center">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Total Campaigns</p>
            <p className="text-xl font-semibold text-text-primary">{client.kpis.totalCampaigns}</p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col justify-center">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Total Revenue</p>
            <p className="text-xl font-semibold text-text-primary">{client.kpis.totalRevenue}</p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col justify-center">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Average Budget</p>
            <p className="text-xl font-semibold text-text-primary">{client.kpis.averageBudget}</p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col justify-center">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Average GP</p>
            <p className="text-xl font-semibold text-text-primary">{client.kpis.averageGp}</p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col justify-center">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Last Campaign</p>
            <p className="text-xl font-semibold text-text-primary">{client.kpis.lastCampaign}</p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col justify-center">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Avg. Approval</p>
            <p className="text-xl font-semibold text-text-primary">{client.kpis.avgApprovalTime}</p>
          </div>
        </div>
      </div>

      {/* Section 1: Client Information */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex items-center justify-between">
          <h3 className="font-semibold text-text-primary">Client Information</h3>
          <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
            {client.status}
          </span>
        </div>
        
        <div className="p-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Client ID</dt>
              <dd className="mt-1 text-sm text-text-primary font-medium">{client.clientId}</dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Company Name (TH)</dt>
              <dd className="mt-1 text-sm text-text-primary">{client.companyNameTh}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Company Name (EN)</dt>
              <dd className="mt-1 text-sm text-text-primary">{client.companyNameEn}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Industry</dt>
              <dd className="mt-1 text-sm text-text-primary">{client.industry}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Client Type</dt>
              <dd className="mt-1 text-sm text-text-primary">{client.clientType}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Tax ID</dt>
              <dd className="mt-1 text-sm text-text-primary">{client.taxId}</dd>
            </div>
            
            <div className="sm:col-span-3">
              <dt className="text-sm font-medium text-text-secondary">Address (TH)</dt>
              <dd className="mt-1 text-sm text-text-primary whitespace-pre-wrap">{client.address}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Account Owner</dt>
              <dd className="mt-1 text-sm text-text-primary">{client.accountOwner}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Created Date</dt>
              <dd className="mt-1 text-sm text-text-primary">{client.createdDate}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-secondary">Last Updated</dt>
              <dd className="mt-1 text-sm text-text-primary">{client.updatedDate}</dd>
            </div>
          </dl>
        </div>
      </div>



    </div>
  );
}
