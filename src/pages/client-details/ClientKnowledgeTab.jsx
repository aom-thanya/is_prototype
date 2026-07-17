import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '../../components/base/badges/badges';
import { Zap, Check, X, File02 } from '@untitledui/icons';

export default function ClientKnowledgeTab() {
  const { id } = useParams();
  const [knowledge, setKnowledge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKnowledge = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/clients/${id}/knowledge`);
        if (!res.ok) throw new Error('Failed to fetch knowledge');
        const data = await res.json();
        setKnowledge(data);
      } catch (err) {
        console.error("Failed to fetch client knowledge:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchKnowledge();
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-surface rounded-xl border border-border p-5 h-32 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl border border-border p-6 h-48 animate-pulse" />
          <div className="bg-surface rounded-xl border border-border p-6 h-48 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!knowledge) return null;

  return (
    <div className="space-y-8">
      {/* Section 1: Preference Tags */}
      <div>
        <h3 className="font-semibold text-text-primary text-lg mb-4">Preference Tags</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PreferenceCategory title="A. Content Style Preference" tags={knowledge.preferences.contentStyle} color="blue" />
          <PreferenceCategory title="B. Creator Preference" tags={knowledge.preferences.creator} color="purple" />
          <PreferenceCategory title="C. Visual Preference" tags={knowledge.preferences.visual} color="sky" />
          <PreferenceCategory title="D. Proposal Preference" tags={knowledge.preferences.proposal} color="orange" />
          <PreferenceCategory title="E. Communication Preference" tags={knowledge.preferences.communication} color="gray" />
          <PreferenceCategory title="F. Don’t / Avoid" tags={knowledge.preferences.avoid} color="error" />
        </div>
      </div>

      {/* Section 2: Do & Don’t List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-xl border border-green-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 text-green-800">
            <Check className="w-5 h-5" />
            <h3 className="font-semibold">Do</h3>
          </div>
          <ul className="space-y-3">
            {knowledge.doList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-green-800 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-error_subtle rounded-xl border border-red-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 text-error-primary">
            <X className="w-5 h-5" />
            <h3 className="font-semibold">Don't</h3>
          </div>
          <ul className="space-y-3">
            {knowledge.dontList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-error-primary text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-error-primary mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 3: Decision Pattern */}
      <div>
        <h3 className="font-semibold text-text-primary text-lg mb-4">Decision Pattern</h3>
        <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
          <div className="bg-brand-50 p-4 rounded-lg border border-brand-100 flex gap-3 mb-6">
            <Zap className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
            <p className="text-sm text-brand-800 leading-relaxed">
              <span className="font-medium">AI Insight:</span> {knowledge.decisionPattern.aiInsight}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <DecisionScore label="Approval Speed" score={knowledge.decisionPattern.approvalSpeed} />
            <DecisionScore label="Data Driven" score={knowledge.decisionPattern.dataDriven} />
            <DecisionScore label="Budget Sensitivity" score={knowledge.decisionPattern.budgetSensitivity} />
            <DecisionScore label="Creative Freedom" score={knowledge.decisionPattern.creativeFreedom} />
            <DecisionScore label="Revision Frequency" score={knowledge.decisionPattern.revisionFrequency} />
            <DecisionScore label="Risk Appetite" score={knowledge.decisionPattern.riskAppetite} />
          </div>
        </div>
      </div>

      {/* Section 4: Knowledge Timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary text-lg">Knowledge Timeline</h3>
        </div>
        <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {knowledge.timeline.map((item, idx) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <File02 className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-medium text-brand-600">{item.date}</div>
                    <Badge color="gray" size="sm">{item.tag}</Badge>
                  </div>
                  <h4 className="font-medium text-text-primary text-sm mb-1">{item.source}</h4>
                  <p className="text-xs text-text-tertiary mb-2">Campagin: {item.campaign}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.note}</p>
                  <p className="text-xs text-text-tertiary mt-2">Added by {item.createdBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreferenceCategory({ title, tags, color }) {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-5">
      <h4 className="font-medium text-text-primary text-sm mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <Badge key={idx} color={color} size="sm">{tag}</Badge>
        ))}
        {tags.length === 0 && <span className="text-sm text-text-tertiary">No tags added</span>}
      </div>
    </div>
  );
}

function DecisionScore({ label, score }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-text-secondary">{label}</span>
        <span className="text-sm font-semibold text-text-primary">{score}/5</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand-500 rounded-full"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}
