import React from 'react';
import { Briefcase01 } from '@untitledui/icons';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wide font-title">IS Prototype</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <a 
          href="#" 
          className="flex items-center gap-3 px-3 py-2.5 bg-gray-800 text-white rounded-lg font-medium transition-colors"
        >
          <Briefcase01 className="w-5 h-5 text-gray-400" />
          Brief Management
        </a>
        {/* Add more menu items here in the future */}
      </nav>
      
      <div className="p-4 border-t border-gray-800 text-sm text-gray-500">
        <p>Logged in as</p>
        <p className="font-medium text-gray-300">Sales User</p>
      </div>
    </aside>
  );
}
