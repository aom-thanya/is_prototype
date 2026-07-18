import React from 'react';

export default function BuyerWorkspaceSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-surface p-6 rounded-xl border border-border shadow-sm mt-8 mb-6">
        <div className="flex items-start gap-4 w-full">
          <div className="w-9 h-9 rounded-lg bg-gray-200 shrink-0"></div>
          <div className="space-y-3 w-full max-w-lg">
            <div className="flex items-center gap-3">
              <div className="h-7 bg-gray-200 rounded w-64"></div>
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 bg-gray-100 rounded w-24"></div>
              <div className="h-3 bg-gray-100 rounded w-24"></div>
              <div className="h-3 bg-gray-100 rounded w-24"></div>
            </div>
          </div>
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-40 shrink-0"></div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="pt-4 grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-1 space-y-6">
          {/* Reference Creators Skeleton */}
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-slate-50">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="p-6 space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 pr-4 rounded-full">
                  <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Client Intelligence Skeleton */}
          <div className="space-y-6">
            <div className="bg-brand-50 rounded-xl border border-brand-100 shadow-sm p-5">
              <div className="h-4 bg-brand-200 rounded w-32 mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-brand-200/50 rounded w-full"></div>
                <div className="h-3 bg-brand-200/50 rounded w-5/6"></div>
                <div className="h-3 bg-brand-200/50 rounded w-4/6"></div>
              </div>
            </div>
            <div className="bg-error-50 rounded-xl border border-error-100 shadow-sm p-5">
              <div className="h-4 bg-error-200 rounded w-24 mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-error-200/50 rounded w-full"></div>
                <div className="h-3 bg-error-200/50 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Table) */}
        <div className="xl:col-span-3">
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="h-9 bg-gray-200 rounded-lg w-32"></div>
            </div>
            <div className="p-4 border-b border-border bg-gray-50 flex gap-4">
               <div className="h-9 bg-gray-200 rounded-lg w-64"></div>
               <div className="h-9 bg-gray-200 rounded-lg w-20"></div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Table Header Skeleton */}
                <div className="flex gap-4 mb-6">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                {/* Table Rows Skeleton */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4 items-center py-4 border-b border-gray-100 last:border-0">
                    <div className="h-4 bg-gray-200 rounded w-4 shrink-0"></div>
                    <div className="flex gap-3 items-center w-48 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-24 shrink-0"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 shrink-0"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 shrink-0"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
