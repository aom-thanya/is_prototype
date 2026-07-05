import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchMd, Plus, Eye } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { Input } from '../components/base/input/input';

export const MOCK_CLIENTS = [
  { id: '1', clientId: 'CLI-001', companyNameTh: 'บริษัท โคคา-โคลา (ประเทศไทย) จำกัด', addressTh: 'กรุงเทพมหานคร' },
  { id: '2', clientId: 'CLI-002', companyNameTh: 'บริษัท ซัมซุง อิเลคโทรนิคส์ จำกัด', addressTh: 'กรุงเทพมหานคร' },
  { id: '3', clientId: 'CLI-003', companyNameTh: 'บริษัท ลอรีอัล (ประเทศไทย) จำกัด', addressTh: 'กรุงเทพมหานคร' },
];

export default function ClientList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredClients = MOCK_CLIENTS.filter(client => 
    client.clientId.toLowerCase().includes(search.toLowerCase()) ||
    client.companyNameTh.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-title">Client Management</h1>
          <p className="text-sm text-text-secondary mt-1">Manage client database and information</p>
        </div>
        <Button color="primary" onClick={() => navigate('/create-client')} iconLeading={Plus}>
          New Client
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-96">
            <Input 
              iconLeading={SearchMd}
              placeholder="Search Client ID, Company Name..." 
              value={search}
              onChange={(val) => setSearch(val)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-border">
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Client ID</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Company Name (TH)</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Address (TH)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">
                    No clients found matching "{search}"
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                      {client.clientId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {client.companyNameTh}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {client.addressTh}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          color="tertiary"
                          size="sm"
                          onClick={() => navigate(`/client/${client.id}`)}
                          iconLeading={Eye}
                          title="View Details"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
