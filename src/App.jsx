import { Routes, Route, Navigate } from 'react-router-dom'
import BriefList from './pages/BriefList'
import CreateBrief from './pages/CreateBrief'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-page-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <Routes>
          <Route path="/brief" element={<BriefList />} />
          <Route path="/create-brief" element={<CreateBrief />} />
          <Route path="/" element={<Navigate to="/brief" replace />} />
          {/* Add more sub paths here in the future */}
        </Routes>
      </main>
    </div>
  )
}

export default App
