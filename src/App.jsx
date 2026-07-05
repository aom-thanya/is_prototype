import BriefList from './pages/BriefList'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-page-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <BriefList />
      </main>
    </div>
  )
}

export default App
