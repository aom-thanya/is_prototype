import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchMd, Plus, Eye } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { Input } from '../components/base/input/input';


export default function ClientList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/clients');
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredClients = clients.filter(client => 
    client.clientId.toLowerCase().includes(search.toLowerCase()) ||
    client.companyNameTh.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-title">จัดการลูกค้า (Client Management)</h1>
          <p className="text-sm text-text-secondary mt-1">จัดการฐานข้อมูลและรายละเอียดของลูกค้า</p>
        </div>
        <Button color="primary" onClick={() => navigate('/create-client')} iconLeading={Plus}>
          เพิ่มลูกค้าใหม่
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-96">
            <Input 
              iconLeading={SearchMd}
              placeholder="ค้นหารหัสลูกค้า, ชื่อบริษัท..." 
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
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">รหัสลูกค้า</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">ชื่อบริษัท (TH)</th>
                <th className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">ที่อยู่ (TH)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading || isFiltering ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-64"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-10 ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">
                    ไม่พบลูกค้าที่ตรงกับ "{search}"
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
                          title="ดูรายละเอียด"
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
