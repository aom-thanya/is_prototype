import React, { useState } from 'react';
import { Briefcase01, Building02, ChevronLeft, ChevronRight } from '@untitledui/icons';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const isActive = location.pathname.startsWith('/brief');
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-900 text-white flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out relative`}>
      <div className={`p-6 border-b border-gray-800 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed ? (
          <h2 className="text-lg font-bold tracking-wide font-title truncate">Brief Management</h2>
        ) : (
          <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold">B</div>
        )}
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link 
          to="/brief" 
          title="Brief"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
            isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Briefcase01 className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="truncate">Brief</span>}
        </Link>
        <Link 
          to="/client" 
          title="Client"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
            location.pathname.startsWith('/client') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Building02 className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="truncate">Client</span>}
        </Link>
        {/* Add more menu items here in the future */}
      </nav>
      
      <div className={`p-4 border-t border-gray-800 flex ${isCollapsed ? 'flex-col items-center gap-4' : 'items-center justify-between gap-2'}`}>
        {!isCollapsed ? (
          <div className="text-sm text-gray-500 overflow-hidden">
            <p className="truncate">Logged in as</p>
            <p className="font-medium text-gray-300 truncate">Sales User</p>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-800 flex shrink-0 items-center justify-center text-gray-300 font-bold text-sm" title="Sales User">
            S
          </div>
        )}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors shrink-0"
          title="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
