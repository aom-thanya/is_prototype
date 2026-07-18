import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import BriefList from './pages/BriefList'
import CreateBrief from './pages/CreateBrief'
import ClientList from './pages/ClientList'
import CreateClient from './pages/CreateClient'
import ClientDetails from './pages/ClientDetails'
import DashboardHome from './pages/DashboardHome'
import BuyerWorkspace from './pages/BuyerWorkspace'
import PlannerWorkspace from './pages/PlannerWorkspace'
import BriefDetails from './pages/BriefDetails'
import SalesHandover from './pages/SalesHandover'
import Sidebar from './components/Sidebar'
import PageLoader from './components/PageLoader'

const LOADING_MESSAGES = [
  "กำลังรวบรวมข้อมูลที่เกี่ยวข้อง...",
  "เพราะแคมเปญที่ดี เริ่มต้นจากบรีฟที่ดี",
  "เตรียมพร้อมสู่แคมเปญถัดไป",
  "อีกสักครู่...",
  "เปลี่ยนบรีฟให้เป็นแคมเปญที่สำเร็จ",
  "จัดระเบียบบรีฟ ข้อมูลลูกค้า และแคมเปญให้พร้อมใช้งาน"
];

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    // Select random message
    const randomMsg = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    setLoadingMessage(randomMsg);

    // Simulate initial loading for 3 seconds
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-page-background">
        <PageLoader message={loadingMessage} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-page-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <Routes>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/brief" element={<BriefList />} />
          <Route path="/create-brief" element={<CreateBrief />} />
          <Route path="/client" element={<ClientList />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/client/:id" element={<ClientDetails />} />
          <Route path="/brief/:id/details" element={<BriefDetails />} />
          <Route path="/brief/:id/buyer" element={<BuyerWorkspace />} />
          <Route path="/brief/:id/planner" element={<PlannerWorkspace />} />
          <Route path="/brief/:id/handover" element={<SalesHandover />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
