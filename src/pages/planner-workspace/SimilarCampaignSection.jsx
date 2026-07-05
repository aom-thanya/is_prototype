import React from 'react';
import { File02, FileCheck02 } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { Badge } from '../../components/base/badges/badges';

export default function SimilarCampaignSection({ campaigns = [] }) {
  if (campaigns.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-text-primary text-lg">Similar Campaigns</h3>
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-surface rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-text-primary text-lg flex items-center gap-2">
                  {camp.campaignName}
                  <Badge color="success" size="sm">{camp.similarityScore}% Similar</Badge>
                </h4>
                <p className="text-sm text-text-secondary mt-1">{camp.brand} • {camp.campaignPeriod}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" color="tertiary" iconLeading={File02}>Proposal</Button>
                <Button size="sm" color="tertiary" iconLeading={FileCheck02}>Deal Sheet</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
              <div>
                <p className="text-xs text-text-tertiary uppercase">Objective</p>
                <p className="text-sm font-medium">{camp.objective}</p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase">Budget</p>
                <p className="text-sm font-medium">{camp.budget}</p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase">Platform</p>
                <p className="text-sm font-medium">{camp.platform}</p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase">Creator Type</p>
                <p className="text-sm font-medium">{camp.creatorType}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold uppercase text-brand-600">Result: </span>
                <span className="text-sm text-text-primary">{camp.resultSummary}</span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-brand-600">Key Learning: </span>
                <span className="text-sm text-text-primary">{camp.keyLearning}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
