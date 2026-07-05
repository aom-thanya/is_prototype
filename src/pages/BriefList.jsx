import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchMd, Plus, Eye, Edit02, Copy01 } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { Input } from '../components/base/input/input';
import { NativeSelect } from '../components/base/select/select-native';
import { Badge } from '../components/base/badges/badges';

import { MOCK_BRIEFS } from '../mockData/briefs';

const STATUS_COLORS = {
  'Draft': 'gray',
  'Brief': 'blue',
  'Dealsheet': 'purple',
  'Proposal': 'sky',
};

const StatusBadge = ({ status }) => {
  const color = STATUS_COLORS[status] || 'gray';
  return (
    <Badge color={color} size="md" type="color">
      {status}
    </Badge>
  );
};

export default function BriefList() {
  const navigate = useNavigate();
  const [briefs] = useState(MOCK_BRIEFS);
  
  // Filters state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [saleFilter, setSaleFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  const uniqueSalesOwners = useMemo(() => {
    return [...new Set(MOCK_BRIEFS.map(b => b.salesOwner))];
  }, []);

  // Handlers
  const handleCreate = () => navigate('/create-brief');
  const handleView = (id) => alert(`Navigate to View Brief page for ID: ${id}`);
  const handleEdit = (id) => alert(`Navigate to Edit Brief page for ID: ${id}`);
  const handleDuplicate = (id) => alert(`Duplicate Brief ID: ${id}`);

  // Derived state
  const filteredBriefs = useMemo(() => {
    return briefs.filter((b) => {
      // Search
      const searchMatch = !search || 
        b.briefNo.toLowerCase().includes(search.toLowerCase()) ||
        b.projectName.toLowerCase().includes(search.toLowerCase()) ||
        b.client.toLowerCase().includes(search.toLowerCase()) ||
        b.brand.toLowerCase().includes(search.toLowerCase());
      
      // Status
      const statusMatch = statusFilter === 'All' || b.status === statusFilter;
      
      // Type
      const typeMatch = typeFilter === 'All' || b.briefType === typeFilter;
      
      // Sale
      const saleMatch = saleFilter === 'All' || b.salesOwner === saleFilter;
      
      // Date
      const fromMatch = !dateFrom || new Date(b.createdDate) >= new Date(dateFrom);
      const toMatch = !dateTo || new Date(b.createdDate) <= new Date(dateTo);

      return searchMatch && statusMatch && typeMatch && saleMatch && fromMatch && toMatch;
    });
  }, [briefs, search, statusFilter, typeFilter, saleFilter, dateFrom, dateTo]);

  // Summary counts
  const totalCount = briefs.length;
  const draftCount = briefs.filter(b => b.status === 'Draft').length;
  const waitingCount = briefs.filter(b => b.status === 'Waiting Review').length;
  const completedCount = briefs.filter(b => b.status === 'Completed').length;

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-title">Brief Management</h1>
          <p className="text-sm text-text-secondary mt-1">Manage campaign briefs from creation to approval</p>
        </div>
        <Button color="primary" onClick={handleCreate} iconLeading={Plus}>
          Create Brief
        </Button>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Briefs', value: totalCount },
          { label: 'Draft', value: draftCount },
          { label: 'Waiting Review', value: waitingCount },
          { label: 'Completed', value: completedCount },
        ].map((card, idx) => (
          <div key={idx} className="bg-surface p-5 rounded-xl border border-border shadow-sm flex flex-col gap-1">
            <span className="text-sm font-medium text-text-secondary">{card.label}</span>
            <span className="text-2xl font-semibold text-text-primary">{card.value}</span>
          </div>
        ))}
      </div>

      {/* 3. Search and Filters */}
      <div className="bg-surface p-5 rounded-xl border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="w-full">
            <Input 
              iconLeading={SearchMd}
              placeholder="Search Brief No, Project..." 
              value={search}
              onChange={(val) => setSearch(val)}
            />
          </div>
          <div className="w-full">
            <NativeSelect 
              value={saleFilter} 
              onChange={(e) => setSaleFilter(e.target.value)}
              options={[
                { label: 'All Sales', value: 'All' },
                ...uniqueSalesOwners.map(owner => ({ label: owner, value: owner }))
              ]}
            />
          </div>
          <div className="w-full">
            <NativeSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: 'All Statuses', value: 'All' },
                { label: 'Draft', value: 'Draft' },
                { label: 'Brief', value: 'Brief' },
                { label: 'Dealsheet', value: 'Dealsheet' },
                { label: 'Proposal', value: 'Proposal' },
              ]}
            />
          </div>
          <div className="w-full">
            <NativeSelect 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { label: 'All Types', value: 'All' },
                { label: 'Standard', value: 'Standard' },
                { label: 'Ratecard', value: 'Ratecard' },
                { label: 'Combined', value: 'Combined' },
              ]}
            />
          </div>
          <div className="w-full">
            <Input 
              type="date" 
              value={dateFrom}
              onChange={(val) => setDateFrom(val)}
            />
          </div>
          <div className="w-full">
            <Input 
              type="date" 
              value={dateTo}
              onChange={(val) => setDateTo(val)}
            />
          </div>
        </div>
      </div>

      {/* 4. Brief Table */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Brief No.</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Client / Brand</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Sale</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBriefs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-text-secondary">
                    <div className="flex flex-col items-center justify-center">
                      <SearchMd className="w-8 h-8 text-gray-300 mb-3" />
                      <p className="text-sm font-medium text-gray-900">No briefs found</p>
                      <p className="text-sm">Try adjusting your filters or search query.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBriefs.map((brief) => {
                  const canEdit = brief.status === 'Draft' || brief.status === 'Rejected';
                  
                  return (
                    <tr key={brief.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                        {brief.briefNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        {brief.projectName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <span className="text-text-primary">{brief.client}</span>
                        <br />
                        <span className="text-xs">{brief.brand}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        {brief.briefType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={brief.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        {brief.salesOwner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div>Created: {brief.createdDate}</div>
                        <div className="text-xs text-gray-400">Updated: {brief.updatedDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            color="tertiary"
                            size="sm"
                            onClick={() => {
                              if (brief.status === 'Draft' || brief.status === 'Brief') {
                                navigate(`/brief/${brief.id}/buyer`);
                              } else {
                                navigate(`/brief/${brief.id}/planner`);
                              }
                            }}
                            iconLeading={Eye}
                            title="View / Process Brief"
                          >
                            Process
                          </Button>
                          {canEdit && (
                            <Button 
                              color="tertiary"
                              size="sm"
                              onClick={() => handleEdit(brief.id)}
                              iconLeading={Edit02}
                              title="Edit"
                            />
                          )}
                          <Button 
                            color="tertiary"
                            size="sm"
                            onClick={() => handleDuplicate(brief.id)}
                            iconLeading={Copy01}
                            title="Duplicate"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
