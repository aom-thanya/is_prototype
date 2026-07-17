import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit02, File02, X } from '@untitledui/icons';

const TruncatedText = ({ text, maxLines = 2 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text) return null;
  
  return (
    <div>
      <p className={`text-sm text-text-primary ${!isExpanded ? 'line-clamp-2' : ''}`}>
        {text}
      </p>
      {text.length > 100 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-brand text-xs font-medium mt-1 hover:underline focus:outline-none"
        >
          {isExpanded ? 'View less' : 'View more'}
        </button>
      )}
    </div>
  );
};

export function CampaignSummaryPanel({ formData, onEditSection }) {
  const [isTabletExpanded, setIsTabletExpanded] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Field definitions to calculate completion
  const fields = [
    { key: 'projectName', required: true },
    { key: 'client', required: true },
    { key: 'brand', required: true },
    { key: 'campaignName', required: false },
    { key: 'product', required: false },
    { key: 'industry', required: false },
    { key: 'objectives', required: true, isArray: true },
    { key: 'description', required: false },
    { key: 'startDate', required: false },
    { key: 'endDate', required: false },
    { key: 'budget', required: true },
    { key: 'budgetRemark', required: false }
  ];

  const totalFields = fields.length;
  const completedFields = fields.filter(f => {
    if (f.isArray) return formData[f.key] && formData[f.key].length > 0;
    return !!formData[f.key];
  }).length;

  const renderFieldValue = (value, required, isArray = false) => {
    if (isArray && value && value.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 mt-1">
          {value.map(val => (
            <span key={val} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium border border-gray-200">
              {val}
            </span>
          ))}
        </div>
      );
    }
    
    if (!value || (isArray && value.length === 0)) {
      return <span className="text-gray-400 text-sm">-</span>;
    }

    return <span className="text-text-primary text-sm font-medium">{value}</span>;
  };

  const SectionHeader = ({ title }) => (
    <div className="flex items-center justify-between mb-3 mt-6 first:mt-0">
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
    </div>
  );

  const SummaryContent = () => (
    <div className="space-y-4 pb-8">
      <div>
        <SectionHeader title="Brief Information" sectionId="section-brief-info" firstInputId="input-project-name" />
        <div className="space-y-3">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Brief No. / Work Order No.</div>
            <div className="text-sm font-medium text-gray-900">BRF-AUTO-GEN</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Project Name</div>
            {renderFieldValue(formData.projectName, true)}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Client</div>
            {renderFieldValue(formData.client, true)}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Brand</div>
            {renderFieldValue(formData.brand, true)}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Campaign Name</div>
            {renderFieldValue(formData.campaignName, false)}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Product / Service</div>
            {renderFieldValue(formData.product, false)}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Industry</div>
            {renderFieldValue(formData.industry, false)}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Campaign Objective</div>
            {renderFieldValue(formData.objectives, true, true)}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Campaign Description</div>
            {formData.description ? (
              <TruncatedText text={formData.description} />
            ) : (
              renderFieldValue('', false)
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 my-6"></div>

      <div>
        <SectionHeader title="Timeline" sectionId="section-timeline" firstInputId="input-start-date" />
        <div className="space-y-3">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Campaign Start Date</div>
            {renderFieldValue(formData.startDate, false)}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Campaign End Date</div>
            {renderFieldValue(formData.endDate, false)}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 my-6"></div>

      <div>
        <SectionHeader title="Budget" sectionId="section-budget" firstInputId="input-budget" />
        <div className="space-y-3">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Budget</div>
            {formData.budget ? (
              <span className="text-sm font-medium text-gray-900">
                {Number(formData.budget).toLocaleString()} {formData.currency || 'THB'}
              </span>
            ) : (
              <span className="text-gray-400 text-sm">-</span>
            )}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Budget Remark</div>
            {formData.budgetRemark ? (
              <TruncatedText text={formData.budgetRemark} />
            ) : (
              renderFieldValue('', false)
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const CompletionHeader = ({ className = '' }) => (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand">
        <File02 className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm">Campaign Setup</h3>
        <p className="text-xs font-medium text-brand mt-0.5">{completedFields} of {totalFields} fields completed</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Panel (lg and above) */}
      <div className="hidden lg:block w-[320px] shrink-0 sticky top-8 self-start">
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-6rem)]">
          <div className="p-5 border-b border-border bg-gray-50 flex-shrink-0">
            <CompletionHeader />
          </div>
          <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
            <SummaryContent />
          </div>
        </div>
      </div>

      {/* Tablet Collapsible Panel (md to lg) */}
      <div className="hidden md:block lg:hidden mb-6">
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <button 
            onClick={() => setIsTabletExpanded(!isTabletExpanded)}
            className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <CompletionHeader />
            {isTabletExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {isTabletExpanded && (
            <div className="p-5 border-t border-border bg-white">
              <SummaryContent />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Button & Drawer (below md) */}
      <div className="md:hidden">
        <div className="fixed bottom-[88px] left-0 right-0 p-4 z-30 pointer-events-none flex justify-center">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="pointer-events-auto bg-brand text-white px-5 py-2.5 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 hover:bg-brand-600 transition-colors"
          >
            <File02 className="w-4 h-4" />
            View Campaign Summary
          </button>
        </div>

        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
              onClick={() => setIsMobileDrawerOpen(false)}
            ></div>
            <div className="bg-white w-full rounded-t-2xl shadow-xl animate-in slide-in-from-bottom-full duration-300 relative z-10 max-h-[85vh] flex flex-col">
              <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-20 shrink-0">
                <CompletionHeader />
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto pb-safe">
                <SummaryContent />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
