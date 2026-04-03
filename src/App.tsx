import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import Ship from './components/views/Ship'
import Explore from './components/views/Explore'
import Shop from './components/views/Shop'
import Achievements from './components/views/Achievements'
import StarterProjects from './components/views/StarterProjects'
import './index.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            !isAuthenticated ? (
              <Landing onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <Navigate to="/launchbay" replace />
            )
          } 
        />
        

        <Route 
          element={
            isAuthenticated ? (
              <Dashboard onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="/launchbay" element={<Ship />} />
          <Route path="/missions" element={<Explore />} />
          <Route path="/starters" element={<StarterProjects />} />
          <Route path="/loadout" element={<Shop />} />
          <Route path="/telemetry" element={<Achievements />} />

          <Route path="*" element={<Navigate to="/launchbay" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
