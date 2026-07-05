import React, { useState, useMemo, useEffect } from 'react';
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
  
  // Pagination & Loading state
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setIsFiltering(true);
    setCurrentPage(1);
    const timer = setTimeout(() => setIsFiltering(false), 500);
    return () => clearTimeout(timer);
  }, [search, statusFilter, typeFilter, saleFilter, dateFrom, dateTo]);
  
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

  // Pagination derived state
  const paginatedBriefs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBriefs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBriefs, currentPage]);

  const totalPages = Math.ceil(filteredBriefs.length / ITEMS_PER_PAGE);

  // Skeleton Row Component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
      <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-20 ml-auto"></div></td>
    </tr>
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-title">จัดการบรีฟ (Brief Management)</h1>
          <p className="text-sm text-text-secondary mt-1">จัดการบรีฟแคมเปญตั้งแต่เริ่มต้นจนถึงอนุมัติ</p>
        </div>
        <Button color="primary" onClick={handleCreate} iconLeading={Plus}>
          สร้างบรีฟ
        </Button>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'บรีฟทั้งหมด', value: totalCount },
          { label: 'Draft', value: draftCount },
          { label: 'รอตรวจสอบ', value: waitingCount },
          { label: 'เสร็จสิ้น', value: completedCount },
        ].map((card, idx) => (
          <div key={idx} className="bg-surface p-5 rounded-xl border border-border shadow-sm flex flex-col gap-1">
            <span className="text-sm font-medium text-text-secondary">{card.label}</span>
            {isFiltering ? (
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mt-1"></div>
            ) : (
              <span className="text-2xl font-semibold text-text-primary">{card.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* 3. Search and Filters */}
      <div className="bg-surface p-5 rounded-xl border border-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="w-full">
            <Input 
              iconLeading={SearchMd}
              placeholder="ค้นหาหมายเลขบรีฟ, โปรเจกต์..." 
              value={search}
              onChange={(val) => setSearch(val)}
            />
          </div>
          <div className="w-full">
            <NativeSelect 
              value={saleFilter} 
              onChange={(e) => setSaleFilter(e.target.value)}
              options={[
                { label: 'ฝ่ายขายทั้งหมด', value: 'All' },
                ...uniqueSalesOwners.map(owner => ({ label: owner, value: owner }))
              ]}
            />
          </div>
          <div className="w-full">
            <NativeSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: 'สถานะทั้งหมด', value: 'All' },
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
                { label: 'ประเภททั้งหมด', value: 'All' },
                { label: 'มาตรฐาน', value: 'Standard' },
                { label: 'เรทการ์ด', value: 'Ratecard' },
                { label: 'แพ็กเกจรวม', value: 'Combined' },
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
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">หมายเลขบรีฟ</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">ชื่อโปรเจกต์</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">ลูกค้า / แบรนด์</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">ประเภท</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">ฝ่ายขาย</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">วันที่</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isFiltering ? (
                Array.from({ length: Math.min(5, paginatedBriefs.length || 5) }).map((_, i) => <SkeletonRow key={i} />)
              ) : paginatedBriefs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-text-secondary">
                    <div className="flex flex-col items-center justify-center">
                      <SearchMd className="w-8 h-8 text-gray-300 mb-3" />
                      <p className="text-sm font-medium text-gray-900">ไม่พบบรีฟ</p>
                      <p className="text-sm">ลองปรับตัวกรองหรือคำค้นหาของคุณ</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedBriefs.map((brief) => {
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
        
        {/* 5. Pagination */}
        {!isFiltering && totalPages > 1 && (
          <div className="flex items-center justify-between bg-white px-4 py-3 border-t border-border sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <Button color="secondary" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>ก่อนหน้า</Button>
              <Button color="secondary" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>ถัดไป</Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  แสดง <span className="font-medium text-text-primary">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> ถึง <span className="font-medium text-text-primary">{Math.min(currentPage * ITEMS_PER_PAGE, filteredBriefs.length)}</span> จาก <span className="font-medium text-text-primary">{filteredBriefs.length}</span> รายการ
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === i + 1 ? 'z-10 bg-brand text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    &gt;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
