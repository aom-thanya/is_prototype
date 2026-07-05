import React, { useState, useMemo } from 'react';
import { SearchMd, Plus, Eye, Edit02, Copy01, Calendar, FilterLines } from '@untitledui/icons';

const MOCK_BRIEFS = [
  { id: '1', briefNo: 'BRF-2026-001', projectName: 'Summer Campaign', client: 'Coca Cola', brand: 'Coke', briefType: 'Standard', status: 'Draft', salesOwner: 'John Doe', createdDate: '2026-07-01', updatedDate: '2026-07-02' },
  { id: '2', briefNo: 'BRF-2026-002', projectName: 'Q3 Promo', client: 'Samsung', brand: 'Galaxy', briefType: 'Combined', status: 'New', salesOwner: 'Jane Smith', createdDate: '2026-07-02', updatedDate: '2026-07-02' },
  { id: '3', briefNo: 'BRF-2026-003', projectName: 'KOL Review', client: 'Loreal', brand: 'Paris', briefType: 'Ratecard', status: 'Waiting Review', salesOwner: 'Alice Bob', createdDate: '2026-07-03', updatedDate: '2026-07-04' },
  { id: '4', briefNo: 'BRF-2026-004', projectName: 'Event Launch', client: 'Nike', brand: 'Sportswear', briefType: 'Standard', status: 'Assigned', salesOwner: 'John Doe', createdDate: '2026-07-04', updatedDate: '2026-07-05' },
  { id: '5', briefNo: 'BRF-2026-005', projectName: 'Social Media Always-on', client: 'Apple', brand: 'iPhone', briefType: 'Combined', status: 'In Progress', salesOwner: 'Jane Smith', createdDate: '2026-07-05', updatedDate: '2026-07-05' },
  { id: '6', briefNo: 'BRF-2026-006', projectName: 'Influencer Seeding', client: 'Dyson', brand: 'Hair Care', briefType: 'Ratecard', status: 'Completed', salesOwner: 'Alice Bob', createdDate: '2026-06-20', updatedDate: '2026-06-25' },
  { id: '7', briefNo: 'BRF-2026-007', projectName: 'PR Crisis Mgmt', client: 'Toyota', brand: 'Corporate', briefType: 'Standard', status: 'Rejected', salesOwner: 'John Doe', createdDate: '2026-06-28', updatedDate: '2026-06-29' },
  { id: '8', briefNo: 'BRF-2026-008', projectName: 'Winter Collection', client: 'Uniqlo', brand: 'LifeWear', briefType: 'Standard', status: 'Draft', salesOwner: 'Jane Smith', createdDate: '2026-07-05', updatedDate: '2026-07-05' },
];

const STATUS_COLORS = {
  'Draft': 'bg-gray-100 text-status-draft border-gray-200',
  'New': 'bg-blue-50 text-status-new border-blue-200',
  'Waiting Review': 'bg-amber-50 text-status-waiting border-amber-200',
  'Assigned': 'bg-primary-soft text-status-assigned border-primary/20',
  'In Progress': 'bg-cyan-50 text-status-in-progress border-cyan-200',
  'Completed': 'bg-green-50 text-status-completed border-green-200',
  'Rejected': 'bg-red-50 text-status-rejected border-red-200',
};

const Badge = ({ status }) => {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {status}
    </span>
  );
};

export default function BriefList() {
  const [briefs, setBriefs] = useState(MOCK_BRIEFS);
  
  // Filters state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Handlers
  const handleCreate = () => alert('Navigate to Create Brief page');
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
      
      // Date
      const fromMatch = !dateFrom || new Date(b.createdDate) >= new Date(dateFrom);
      const toMatch = !dateTo || new Date(b.createdDate) <= new Date(dateTo);

      return searchMatch && statusMatch && typeMatch && fromMatch && toMatch;
    });
  }, [briefs, search, statusFilter, typeFilter, dateFrom, dateTo]);

  // Summary counts (based on all briefs or filtered briefs? Usually all briefs for summary, but let's do all briefs so they don't jump around)
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
        <button 
          onClick={handleCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Create Brief
        </button>
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 relative">
            <SearchMd className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Brief No, Project, Client, Brand..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm appearance-none bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="New">New</option>
              <option value="Waiting Review">Waiting Sales Co Review</option>
              <option value="Rejected">Rejected</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm appearance-none bg-white"
            >
              <option value="All">All Types</option>
              <option value="Standard">Standard</option>
              <option value="Ratecard">Ratecard</option>
              <option value="Combined">Combined</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <input 
              type="date" 
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-600"
            />
          </div>
          <div className="md:col-span-2">
            <input 
              type="date" 
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-600"
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
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Owner</th>
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
                        <Badge status={brief.status} />
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
                          <button 
                            onClick={() => handleView(brief.id)}
                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-soft rounded-md transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {canEdit && (
                            <button 
                              onClick={() => handleEdit(brief.id)}
                              className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-soft rounded-md transition-colors"
                              title="Edit"
                            >
                              <Edit02 className="w-4 h-4" />
                            </button>
                          )}
                          
                          <button 
                            onClick={() => handleDuplicate(brief.id)}
                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-soft rounded-md transition-colors"
                            title="Duplicate"
                          >
                            <Copy01 className="w-4 h-4" />
                          </button>
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
