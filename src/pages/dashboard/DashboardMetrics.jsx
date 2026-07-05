import React from 'react';
import { Briefcase01, Calendar, Clock, CheckCircle, AlertCircle, BarChart01 } from '@untitledui/icons';

export default function DashboardMetrics({ briefs, slaStats, currentRole, isLoading }) {
  // Calculate metrics based on current briefs in view
  const myBriefsCount = briefs.length;
  const dueTodayCount = briefs.filter(b => b.slaStatus === 'Due Today').length;
  const overdueCount = briefs.filter(b => b.slaStatus === 'Overdue').length;
  const waitingCount = briefs.filter(b => b.myRole === currentRole && !b.isCompleted).length;
  const completedCount = briefs.filter(b => b.isCompleted).length;

  const currentSLA = slaStats[currentRole] || slaStats['Planner']; // fallback

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Metric Cards */}
        <div className="bg-surface rounded-xl border border-border shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Briefcase01 className="w-4 h-4" />
            <span className="text-sm font-medium">บรีฟของฉัน</span>
          </div>
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mt-1"></div>
          ) : (
            <div className="text-2xl font-semibold text-text-primary">{myBriefsCount}</div>
          )}
        </div>

        <div className="bg-surface rounded-xl border border-warning-200 shadow-sm p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-warning-500"></div>
          <div className="flex items-center gap-2 text-warning-700 mb-2 pl-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">ครบกำหนดวันนี้</span>
          </div>
          {isLoading ? (
            <div className="h-8 bg-warning-200 rounded w-16 animate-pulse mt-1 ml-2"></div>
          ) : (
            <div className="text-2xl font-semibold text-text-primary pl-2">{dueTodayCount}</div>
          )}
        </div>

        <div className="bg-error-50 rounded-xl border border-error-200 shadow-sm p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-error-600"></div>
          <div className="flex items-center gap-2 text-error-800 mb-2 pl-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">เลยกำหนด</span>
          </div>
          {isLoading ? (
            <div className="h-8 bg-error-200 rounded w-16 animate-pulse mt-1 ml-2"></div>
          ) : (
            <div className="text-2xl font-semibold text-error-800 pl-2">{overdueCount}</div>
          )}
        </div>

        <div className="bg-brand-50 rounded-xl border border-brand-200 shadow-sm p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-600"></div>
          <div className="flex items-center gap-2 text-brand-800 mb-2 pl-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">รอฉันจัดการ</span>
          </div>
          {isLoading ? (
            <div className="h-8 bg-brand-200 rounded w-16 animate-pulse mt-1 ml-2"></div>
          ) : (
            <div className="text-2xl font-semibold text-brand-900 pl-2">{waitingCount}</div>
          )}
        </div>

        <div className="bg-surface rounded-xl border border-border shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-success-700 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">เสร็จสิ้น</span>
          </div>
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mt-1"></div>
          ) : (
            <div className="text-2xl font-semibold text-text-primary">{completedCount}</div>
          )}
        </div>

        {/* Personal SLA Card */}
        <div className="bg-gray-900 text-white rounded-xl shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <BarChart01 className="w-4 h-4" />
            <span className="text-sm font-medium">SLA ส่วนตัว</span>
          </div>
          <div className="flex items-end justify-between">
            {isLoading ? (
              <div className="h-8 bg-gray-700 rounded w-20 animate-pulse"></div>
            ) : (
              <div className="text-2xl font-semibold text-white">{currentSLA.achievement}%</div>
            )}
            <div className="text-xs text-gray-400 pb-1 text-right">
              {isLoading ? (
                <div className="h-4 bg-gray-700 rounded w-16 animate-pulse inline-block"></div>
              ) : (
                <>ตรงเวลา: {currentSLA.onTime}</>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
