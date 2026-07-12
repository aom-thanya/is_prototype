import React, { useState, useEffect } from 'react';
import { Users01 } from '@untitledui/icons';
import DashboardMetrics from './dashboard/DashboardMetrics';
import DashboardBriefTable from './dashboard/DashboardBriefTable';

const ROLES = ['Sales', 'Buyer', 'Planner'];

export default function DashboardHome() {
  const [currentRole, setCurrentRole] = useState('Buyer'); // Default role for demo
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState([]);
  const [slaStats, setSlaStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [briefsRes, statsRes] = await Promise.all([
          fetch('/api/dashboard/briefs'),
          fetch('/api/dashboard/stats')
        ]);
        const briefsData = await briefsRes.json();
        const statsData = await statsRes.json();
        setDashboardData(briefsData);
        setSlaStats(statsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentRole]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      
      {/* Header & Role Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-title">หน้าแรก (Brief Management Home)</h1>
          <p className="text-sm text-text-secondary mt-1">ติดตามบรีฟที่กำลังดำเนินการ, จัดลำดับความสำคัญของงานด่วน, และจัดการทุกงานของคุณด้วยแดชบอร์ดส่วนตัว</p>
        </div>
        
        {/* Prototype Only: Role Simulator */}
        <div className="bg-brand-50 border border-brand-200 p-2.5 rounded-lg flex items-center gap-3">
          <div className="flex items-center gap-2 text-brand-700 text-sm font-medium">
            <Users01 className="w-4 h-4" />
            จำลองการเข้าใช้ด้วยสิทธิ์:
          </div>
          <select 
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="text-sm border-brand-300 rounded-md focus:ring-brand-500 focus:border-brand-500 py-1.5 pl-3 pr-8"
          >
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <DashboardMetrics 
        briefs={dashboardData} 
        slaStats={slaStats} 
        currentRole={currentRole}
        isLoading={isLoading}
      />
      
      <DashboardBriefTable 
        briefs={dashboardData} 
        currentRole={currentRole}
        isRoleLoading={isLoading}
      />

    </div>
  );
}
