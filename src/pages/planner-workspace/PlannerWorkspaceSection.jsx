import React, { useState } from 'react';
import { Zap, CheckCircle, Save01, XClose } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { TextArea } from '../../components/base/textarea/textarea';
import { Badge } from '../../components/base/badges/badges';

export default function PlannerWorkspaceSection() {
  const [note, setNote] = useState('');
  const [direction, setDirection] = useState('');
  const [aiState, setAiState] = useState('idle'); // idle, loading, suggestion, saved

  const handleSaveToKnowledge = () => {
    if (!note.trim()) return;
    setAiState('loading');
    setTimeout(() => {
      setAiState('suggestion');
    }, 1200);
  };

  const handleAcceptSuggestion = () => {
    setAiState('saved');
    setTimeout(() => setAiState('idle'), 3000);
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="font-semibold text-text-primary text-lg">Planner Workspace</h3>
        <Badge color="blue">Draft</Badge>
      </div>

      <div className="space-y-6">
        <div>
          <TextArea 
            label="Proposal Direction" 
            placeholder="Draft your proposal direction, key messages, and content direction here..." 
            rows={4}
            value={direction}
            onChange={val => setDirection(val)}
          />
        </div>

        <div className="relative">
          <TextArea 
            label="Planner Note" 
            placeholder="Any specific notes or new findings about the client? (e.g. ลูกค้าชอบให้ใส่ Benchmark)" 
            rows={3}
            value={note}
            onChange={val => setNote(val)}
          />
          <div className="mt-2 flex justify-end">
            <Button 
              size="sm" 
              color="secondary" 
              iconLeading={Save01}
              onClick={handleSaveToKnowledge}
              disabled={!note.trim() || aiState !== 'idle'}
            >
              Save to Client Knowledge
            </Button>
          </div>

          {/* AI Knowledge Capture Interaction */}
          {aiState !== 'idle' && (
            <div className="mt-4 p-4 rounded-xl border border-brand-200 bg-brand-50 animate-in fade-in slide-in-from-top-2">
              {aiState === 'loading' && (
                <div className="flex items-center justify-center gap-3 py-2 text-brand-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-600"></div>
                  <span className="text-sm font-medium">AI is categorizing your note...</span>
                </div>
              )}
              
              {aiState === 'suggestion' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-brand-800">
                      <Zap className="w-4 h-4 text-brand-600" /> AI Suggestion
                    </h4>
                    <button onClick={() => setAiState('idle')} className="text-gray-400 hover:text-gray-600">
                      <XClose className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-brand-100 text-sm">
                    <p><span className="font-medium text-text-primary">Category:</span> <Badge size="sm" color="purple">Proposal Preference</Badge></p>
                    <p className="mt-1"><span className="font-medium text-text-primary">Knowledge:</span> {note}</p>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button size="sm" color="tertiary" onClick={() => setAiState('idle')}>Ignore</Button>
                    <Button size="sm" color="primary" onClick={handleAcceptSuggestion}>Accept & Save</Button>
                  </div>
                </div>
              )}

              {aiState === 'saved' && (
                <div className="flex items-center gap-2 text-success-700 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Successfully saved to Client Knowledge!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
