import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit02 } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';

// Import Tab Components
import OverviewTab from './client-details/OverviewTab';
import ContactsTab from './client-details/ContactsTab';
import BrandsTab from './client-details/BrandsTab';
import CampaignHistoryTab from './client-details/CampaignHistoryTab';
import ClientKnowledgeTab from './client-details/ClientKnowledgeTab';
import DocumentsTab from './client-details/DocumentsTab';
import CompetitorsTab from './client-details/CompetitorsTab';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'brands', label: 'Brands' },
  { id: 'campaign_history', label: 'Campaign History' },
  { id: 'client_knowledge', label: 'Client Knowledge' },
  { id: 'competitors', label: 'Competitors' },
  { id: 'documents', label: 'Documents' }
];

export default function ClientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [client, setClient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch client details');
        }
        const data = await res.json();
        setClient(data);
      } catch (err) {
        console.error("Failed to fetch client:", err);
        setError(err.message);
      }
    };
    
    fetchClient();
  }, [id]);

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-full">
        <p className="text-error-500">{error}</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-8 max-w-[1400px] mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>
          </div>
          <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Tabs Skeleton */}
        <div className="border-b border-border">
          <div className="flex space-x-8 pb-px">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-t animate-pulse mb-1" />
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="pt-4 pb-24 space-y-6">
          <div className="h-48 w-full bg-gray-100 rounded-xl animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate('/client')} />
          <div>
            <h1 className="text-2xl font-semibold text-text-primary font-title">Client Details</h1>
            <p className="text-sm text-text-secondary mt-1">View and manage client 360° information</p>
          </div>
        </div>
        <Button color="secondary" iconLeading={Edit02}>
          Edit Client
        </Button>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors outline-none
                  ${isActive 
                    ? 'border-brand text-brand-600' 
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-4 pb-24">
        {activeTab === 'overview' && <OverviewTab client={client} />}
        {activeTab === 'contacts' && <ContactsTab />}
        {activeTab === 'brands' && <BrandsTab />}
        {activeTab === 'campaign_history' && <CampaignHistoryTab />}
        {activeTab === 'client_knowledge' && <ClientKnowledgeTab />}
        {activeTab === 'competitors' && <CompetitorsTab />}
        {activeTab === 'documents' && <DocumentsTab />}
      </div>
    </div>
  );
}
