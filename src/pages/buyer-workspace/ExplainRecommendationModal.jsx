import React from 'react';
import { createPortal } from 'react-dom';
import { XClose, CheckCircle, AlertTriangle, File02 } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { Badge } from '../../components/base/badges/badges';

export default function ExplainRecommendationModal({ isOpen, onClose, creator }) {
  if (!isOpen || !creator) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
              <span className="font-semibold text-lg">{creator.creatorName.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Why recommended?</h3>
              <p className="text-sm text-text-secondary">{creator.creatorName} • {creator.platform}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <XClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* Summary */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-5">
            <h4 className="text-brand-800 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-600" /> AI Summary
            </h4>
            <p className="text-sm text-brand-900 leading-relaxed">{creator.explanation.summary}</p>
          </div>

          {/* Evidence */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Key Evidence</h4>
            <ul className="space-y-3">
              {creator.explanation.evidence.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary">
                  <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Breakdown Score */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Score Breakdown</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(creator.scoreBreakdown).map(([key, val]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                  <div key={key} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-xs text-text-secondary">{label}</span>
                    <Badge color={val >= 90 ? 'success' : val >= 80 ? 'warning' : 'gray'} size="sm">{val}%</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risks */}
          {creator.explanation.risks && creator.explanation.risks.length > 0 && (
            <div className="bg-error-50 border border-error-200 rounded-xl p-5">
              <h4 className="text-error-800 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-error-600" /> Risks & Considerations
              </h4>
              <ul className="space-y-2">
                {creator.explanation.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-error-900">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-error-600 shrink-0"></div>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Similar Campaigns */}
          {creator.explanation.similarCampaigns && creator.explanation.similarCampaigns.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Similar Campaign Reference</h4>
              <div className="space-y-3">
                {creator.explanation.similarCampaigns.map((camp, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 border border-border rounded-lg bg-gray-50">
                    <File02 className="w-5 h-5 text-gray-400 shrink-0" />
                    <div>
                      <h5 className="text-sm font-medium text-text-primary">{camp.name}</h5>
                      <p className="text-xs text-text-secondary mt-1">{camp.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-gray-50 flex justify-end">
          <Button color="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
