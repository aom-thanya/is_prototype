import { Routes, Route, Navigate } from 'react-router-dom'
import BriefList from './pages/BriefList'
import CreateBrief from './pages/CreateBrief'
import ClientList from './pages/ClientList'
import CreateClient from './pages/CreateClient'
import ClientDetails from './pages/ClientDetails'
import BuyerWorkspace from './pages/BuyerWorkspace'
import PlannerWorkspace from './pages/PlannerWorkspace'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-page-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <Routes>
          <Route path="/brief" element={<BriefList />} />
          <Route path="/create-brief" element={<CreateBrief />} />
          <Route path="/client" element={<ClientList />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/client/:id" element={<ClientDetails />} />
          <Route path="/brief/:id/buyer" element={<BuyerWorkspace />} />
          <Route path="/brief/:id/planner" element={<PlannerWorkspace />} />
          <Route path="/" element={<Navigate to="/brief" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
