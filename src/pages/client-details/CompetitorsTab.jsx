import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Edit02, Trash01, LinkExternal02 } from '@untitledui/icons';
import { Button } from '../../components/base/buttons/button';
import { Input } from '../../components/base/input/input';
import { TextArea } from '../../components/base/textarea/textarea';

export default function CompetitorsTab() {
  const { id } = useParams();
  const [competitors, setCompetitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    const fetchCompetitors = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/clients/${id}/competitors`);
        if (!res.ok) throw new Error('Failed to fetch competitors');
        const data = await res.json();
        setCompetitors(data);
      } catch (err) {
        console.error("Failed to fetch competitors:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompetitors();
  }, [id]);

  const startEdit = (comp) => {
    setEditingId(comp.id);
    setEditForm({ ...comp });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    setCompetitors(competitors.map(c => c.id === editForm.id ? editForm : c));
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const removeCompetitor = (id) => {
    if (confirm("Are you sure you want to remove this competitor?")) {
      setCompetitors(competitors.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary text-lg">Competitors Landscape</h3>
        <Button color="secondary" size="sm" iconLeading={Plus} onClick={() => alert('Open Add Competitor Modal')}>
          Add Competitor
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="bg-surface rounded-xl border border-border shadow-sm p-6 h-64 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : competitors.length === 0 ? (
        <div className="p-12 text-center bg-surface border border-border rounded-xl text-text-secondary">
          No competitors added yet. Add competitors to help the market context.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {competitors.map((comp) => {
            if (editingId === comp.id) {
              return (
                <div key={comp.id} className="bg-surface rounded-xl border border-brand-500 shadow-sm p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <h4 className="font-medium text-text-primary">Edit Competitor</h4>
                    <div className="flex gap-2">
                      <Button color="tertiary" size="sm" onClick={cancelEdit}>Cancel</Button>
                      <Button color="primary" size="sm" onClick={saveEdit}>Save</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Competitor Name" value={editForm.competitorName} onChange={val => handleEditChange('competitorName', val)} />
                    <Input label="Brand / Company" value={editForm.brandCompany} onChange={val => handleEditChange('brandCompany', val)} />
                    <Input label="Website URL" value={editForm.websiteUrl} onChange={val => handleEditChange('websiteUrl', val)} />
                    <Input label="Social Media URL" value={editForm.socialMediaUrl} onChange={val => handleEditChange('socialMediaUrl', val)} />
                    <div className="md:col-span-2">
                      <Input label="Campaign Reference URL" value={editForm.campaignReferenceUrl} onChange={val => handleEditChange('campaignReferenceUrl', val)} />
                    </div>
                    <div className="md:col-span-2">
                      <TextArea label="Key Message / Positioning" value={editForm.keyMessagePositioning} onChange={val => handleEditChange('keyMessagePositioning', val)} rows={2} />
                    </div>
                    <div>
                      <TextArea label="Strengths" value={editForm.strengths} onChange={val => handleEditChange('strengths', val)} rows={2} />
                    </div>
                    <div>
                      <TextArea label="Weaknesses" value={editForm.weaknesses} onChange={val => handleEditChange('weaknesses', val)} rows={2} />
                    </div>
                    <div className="md:col-span-2">
                      <TextArea label="Notes" value={editForm.notes} onChange={val => handleEditChange('notes', val)} rows={2} />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={comp.id} className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-border bg-gray-50 flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">{comp.competitorName}</h4>
                    {comp.brandCompany && <p className="text-sm text-text-secondary mt-1">{comp.brandCompany}</p>}
                    
                    <div className="flex gap-4 mt-3">
                      {comp.websiteUrl && (
                        <a href={comp.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium">
                          <LinkExternal02 className="w-4 h-4" /> Website
                        </a>
                      )}
                      {comp.socialMediaUrl && (
                        <a href={comp.socialMediaUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium">
                          <LinkExternal02 className="w-4 h-4" /> Social Media
                        </a>
                      )}
                      {comp.campaignReferenceUrl && (
                        <a href={comp.campaignReferenceUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium">
                          <LinkExternal02 className="w-4 h-4" /> Campaign Ref
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button color="tertiary" size="sm" iconLeading={Edit02} onClick={() => startEdit(comp)}>Edit</Button>
                    <Button color="tertiary" size="sm" iconLeading={Trash01} className="text-gray-400 hover:text-error" onClick={() => removeCompetitor(comp.id)}>Delete</Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                    <div className="md:col-span-3">
                      <dt className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Key Message / Positioning</dt>
                      <dd className="text-sm text-text-primary bg-gray-50 p-4 rounded-lg border border-border/50">{comp.keyMessagePositioning || '-'}</dd>
                    </div>
                    
                    <div className="md:col-span-1">
                      <dt className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Strengths</dt>
                      <dd className="text-sm text-success-700 bg-success-50 p-4 rounded-lg border border-success-200">{comp.strengths || '-'}</dd>
                    </div>
                    
                    <div className="md:col-span-1">
                      <dt className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Weaknesses</dt>
                      <dd className="text-sm text-error-700 bg-error-50 p-4 rounded-lg border border-error-200">{comp.weaknesses || '-'}</dd>
                    </div>

                    <div className="md:col-span-1">
                      <dt className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Notes</dt>
                      <dd className="text-sm text-text-primary bg-gray-50 p-4 rounded-lg border border-border/50">{comp.notes || '-'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
