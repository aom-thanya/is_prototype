import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, SearchSm } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';

export default function ProposalFitCheckSection() {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsChecked(true);
    }, 1500);
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="font-semibold text-text-primary text-lg">Proposal Fit Check</h3>
        {!isChecked && !loading && (
          <Button color="secondary" size="sm" iconLeading={SearchSm} onClick={handleCheck}>
            Run Fit Check
          </Button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mb-3"></div>
          <p className="text-sm text-text-secondary">Analyzing workspace against client knowledge...</p>
        </div>
      )}

      {!loading && !isChecked && (
        <div className="text-center py-8 text-text-secondary">
          Run Proposal Fit Check before generating Proposal to ensure all client requirements are met.
        </div>
      )}

      {isChecked && (
        <div className="space-y-6 animate-in fade-in">
          {/* Score Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-text-primary">Proposal Readiness</span>
              <span className="text-2xl font-bold text-success-600">86%</span>
            </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-success-500 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Passed */}
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-success-700 mb-3">
                <CheckCircle className="w-5 h-5" /> Passed Items
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-success-500 shrink-0"></div>
                  มี KPI ชัดเจน
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-success-500 shrink-0"></div>
                  Creator ตรงกับ Lifestyle Preference ของลูกค้า
                </li>
              </ul>
            </div>

            {/* Warnings & Missing */}
            <div className="space-y-4">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-warning-700 mb-2">
                  <AlertTriangle className="w-5 h-5" /> Warnings
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-text-secondary">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-warning-500 shrink-0"></div>
                    Proposal Direction ยังไม่ระบุ Mood Premium ชัดเจน
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-error-700 mb-2">
                  <XCircle className="w-5 h-5" /> Missing Items
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-text-secondary">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-error-500 shrink-0"></div>
                    ยังไม่มี Benchmark / Case Study
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="bg-brand-50 p-4 rounded-xl border border-brand-200">
            <h4 className="text-sm font-semibold text-brand-800 mb-1">Recommended Action</h4>
            <p className="text-sm text-brand-900">เพิ่ม Benchmark และ Case Study จาก Similar Campaign (เช่น Coke Summer 2025) ก่อนทำการ Generate Proposal หรือส่งให้ Sales ตรวจ</p>
          </div>
        </div>
      )}
    </div>
  );
}
