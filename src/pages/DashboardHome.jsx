import React, { useState } from 'react';
import { Users01 } from '@untitledui/icons';
import DashboardMetrics from './dashboard/DashboardMetrics';
import DashboardBriefTable from './dashboard/DashboardBriefTable';
import { MOCK_DASHBOARD_DATA, MOCK_SLA_STATS } from '../mockData/dashboardData';

const ROLES = ['Sales', 'Buyer', 'Planner'];

export default function DashboardHome() {
  const [currentRole, setCurrentRole] = useState('Buyer'); // Default role for demo

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      
      {/* Header & Role Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-title">Brief Management Home</h1>
          <p className="text-sm text-text-secondary mt-1">Track your active briefs, prioritize urgent tasks, and stay on top of every assignment with a personalized dashboard.</p>
        </div>
        
        {/* Prototype Only: Role Simulator */}
        <div className="bg-brand-50 border border-brand-200 p-2.5 rounded-lg flex items-center gap-3">
          <div className="flex items-center gap-2 text-brand-700 text-sm font-medium">
            <Users01 className="w-4 h-4" />
            Simulate Role:
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
        briefs={MOCK_DASHBOARD_DATA} 
        slaStats={MOCK_SLA_STATS} 
        currentRole={currentRole} 
      />
      
      <DashboardBriefTable 
        briefs={MOCK_DASHBOARD_DATA} 
        currentRole={currentRole}
      />

    </div>
  );
}
