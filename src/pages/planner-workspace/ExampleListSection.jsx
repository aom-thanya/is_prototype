import React from 'react';
import { Button } from '../../components/base/buttons/button';
import { Badge } from '../../components/base/badges/badges';
import { MOCK_BUYER_RECOMMENDATIONS } from '../../mockData/buyerRecommendations';

export default function ExampleListSection() {
  const creators = MOCK_BUYER_RECOMMENDATIONS.recommendedCreators;

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-text-primary text-lg">Example List from Buyer</h3>
          <p className="text-sm text-text-secondary mt-1">Submitted by Buyer B on 6 Jul 2026</p>
        </div>
        <Badge color="success">Ready for Deal Sheet</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-border">
              <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase">Creator</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase">Platform</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase">Metrics</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase">Price</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase">Match Score</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {creators.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-medium">
                      {c.creatorName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{c.creatorName}</p>
                      <p className="text-xs text-text-secondary">{c.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {c.platform}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  <p>Followers: {c.follower}</p>
                  <p>ER: {c.engagementRate}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                  {c.estimatedPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge color="success" size="sm">{c.overallMatchScore}%</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button size="sm" color="tertiary">Add to Deal Sheet</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
