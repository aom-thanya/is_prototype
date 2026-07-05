import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit02 } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { GET_MOCK_CLIENT } from '../mockData/clientDetails';

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

  useEffect(() => {
    // Simulate fetch.
    setClient(GET_MOCK_CLIENT(id));
  }, [id]);

  if (!client) {
    return (
      <div className="p-8 flex items-center justify-center min-h-full">
        <p className="text-text-secondary">Loading client data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-6">
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
        {activeTab === 'contacts' && <ContactsTab contacts={client.contacts} />}
        {activeTab === 'brands' && <BrandsTab brands={client.brands} />}
        {activeTab === 'campaign_history' && <CampaignHistoryTab history={client.campaignHistory} />}
        {activeTab === 'client_knowledge' && <ClientKnowledgeTab knowledge={client.knowledge} />}
        {activeTab === 'competitors' && <CompetitorsTab competitors={client.competitors} />}
        {activeTab === 'documents' && <DocumentsTab documents={client.documents} />}
      </div>
    </div>
  );
}
