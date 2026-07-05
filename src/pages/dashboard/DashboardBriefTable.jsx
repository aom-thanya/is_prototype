import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchSm, FilterLines, AlertCircle, Clock, CheckCircle, ArrowRight } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { Input } from '../../components/base/input/input';
import { Badge } from '../../components/base/badges/badges';

export default function DashboardBriefTable({ briefs, currentRole }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Action Required');
  const [search, setSearch] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 500);
    return () => clearTimeout(timer);
  }, [search, activeTab]);

  // Filter based on Tabs
  let filteredBriefs = briefs;
  
  if (activeTab === 'ต้องจัดการ') {
    filteredBriefs = briefs.filter(b => !b.isCompleted && (b.slaStatus === 'Overdue' || b.slaStatus === 'Due Today' || b.myRole === currentRole));
  } else if (activeTab === 'เสร็จสิ้น') {
    filteredBriefs = briefs.filter(b => b.isCompleted);
  } else {
    // All Active
    filteredBriefs = briefs.filter(b => !b.isCompleted);
  }

  // Filter based on Search
  if (search) {
    const s = search.toLowerCase();
    filteredBriefs = filteredBriefs.filter(b => 
      b.briefNo.toLowerCase().includes(s) || 
      b.clientName.toLowerCase().includes(s) ||
      b.campaignName.toLowerCase().includes(s)
    );
  }

  // Sort: Overdue > Due Today > Waiting > Others
  filteredBriefs.sort((a, b) => {
    const priority = { 'Overdue': 1, 'Due Today': 2, 'On Track': 3, 'Completed': 4, 'On Time': 4, 'Late': 4 };
    const pA = priority[a.slaStatus] || 99;
    const pB = priority[b.slaStatus] || 99;
    return pA - pB;
  });

  const getSlaBadge = (status, days) => {
    if (status === 'Overdue') {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-error-50 text-error-700 border border-error-200">
          <AlertCircle className="w-3.5 h-3.5" />
          เลยกำหนด {days} วัน
        </div>
      );
    }
    if (status === 'Due Today') {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-warning-50 text-warning-700 border border-warning-200">
          <Clock className="w-3.5 h-3.5" />
          ครบกำหนดวันนี้
        </div>
      );
    }
    if (status === 'On Track') {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success-50 text-success-700 border border-success-200">
          <CheckCircle className="w-3.5 h-3.5" />
          ตามกำหนด
        </div>
      );
    }
    return <Badge color="gray">{status}</Badge>;
  };

  return (
    <div className="bg-surface border border-border shadow-sm rounded-xl overflow-hidden flex flex-col mt-6">
      
      {/* Header & Controls */}
      <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between gap-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg self-start">
          {['ต้องจัดการ', 'กำลังดำเนินการ', 'เสร็จสิ้น'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-64">
            <Input 
              icon={SearchSm} 
              placeholder="ค้นหาบรีฟ..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button color="secondary" iconLeading={FilterLines}>ตัวกรอง</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">รายละเอียดบรีฟ</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">สถานะ / ผู้รับผิดชอบ</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">สถานะ SLA</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-tertiary uppercase tracking-wider">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-border">
            {isFiltering ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-8 bg-gray-200 rounded w-24 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : filteredBriefs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">
                  ไม่พบบรีฟที่ตรงกับเงื่อนไข
                </td>
              </tr>
            ) : (
              filteredBriefs.map((brief) => (
                <tr key={brief.id} className="hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => navigate(brief.route)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-primary">{brief.briefNo}</span>
                      <span className="text-sm text-text-secondary">{brief.clientName} - {brief.campaignName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 items-start">
                      <Badge color={brief.isCompleted ? 'success' : 'sky'}>{brief.currentStatus}</Badge>
                      <span className="text-xs text-text-tertiary">ผู้รับผิดชอบ: {brief.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 items-start">
                      {getSlaBadge(brief.slaStatus, brief.overdueDays)}
                      {!brief.isCompleted && <span className="text-xs text-text-tertiary">ครบกำหนด: {brief.dueDate}</span>}
                      {brief.isCompleted && <span className="text-xs text-text-tertiary">เสร็จสิ้นเมื่อ: {brief.completedDate}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {brief.actionRequired !== 'None' ? (
                      <Button 
                        color={brief.slaStatus === 'Overdue' ? 'primary-destructive' : (brief.slaStatus === 'Due Today' ? 'primary' : 'secondary')} 
                        size="sm"
                        iconTrailing={ArrowRight}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(brief.route);
                        }}
                      >
                        {brief.actionRequired}
                      </Button>
                    ) : (
                      <span className="text-sm text-text-tertiary mr-4">{brief.completedAction}</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
