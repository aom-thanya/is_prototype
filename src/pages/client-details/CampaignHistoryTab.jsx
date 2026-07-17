import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SearchMd, Eye } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { Input } from '../../components/base/input/input';
import { NativeSelect } from '../../components/base/select/select-native';

export default function CampaignHistoryTab() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/clients/${id}/campaign_history`);
        if (!res.ok) throw new Error('Failed to fetch campaign history');
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch campaign history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary text-lg">Campaign History</h3>
      </div>

      {/* Filters */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-4 items-center">
        <div className="w-64">
          <Input 
            iconLeading={SearchMd}
            placeholder="Search Campaign Name..." 
            value={search}
            onChange={(val) => setSearch(val)}
          />
        </div>
        <div className="w-48">
          <NativeSelect options={[{label: 'All Brands', value: 'all'}, {label: 'Coke', value: 'coke'}, {label: 'Minute Maid', value: 'minute_maid'}]} />
        </div>
        <div className="w-48">
          <NativeSelect options={[{label: 'All Statuses', value: 'all'}, {label: 'Completed', value: 'completed'}, {label: 'Active', value: 'active'}]} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-border">
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Campaign Name</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Type & Obj</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Platform & Creator</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Budget / GP</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Result Summary</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded w-full"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-full"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-full"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-full"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-full"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-10 ml-auto"></div></td>
                  </tr>
                ))
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                    No campaign history yet.
                  </td>
                </tr>
              ) : (
                history.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-primary">{campaign.name}</div>
                      <div className="text-sm text-text-secondary">Brand: {campaign.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {campaign.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary">{campaign.type}</div>
                      <div className="text-sm text-text-secondary">{campaign.objective}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary truncate max-w-[150px]" title={campaign.platform}>{campaign.platform}</div>
                      <div className="text-sm text-text-secondary truncate max-w-[150px]" title={campaign.creatorType}>{campaign.creatorType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-primary">{campaign.budget}</div>
                      <div className="text-sm text-brand-600 font-medium">GP: {campaign.gp}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary max-w-[200px] truncate" title={campaign.result}>
                      {campaign.result}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button color="tertiary" size="sm" iconLeading={Eye} title="View Details" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
