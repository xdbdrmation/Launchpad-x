import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Rocket, Compass, Package, Activity, Lightbulb } from 'lucide-react';
import { PLACEHOLDER_DASHBOARD_STATS } from '../placeholders';
import '../App.css';

interface DashboardProps {
  onLogout: () => void;
}

// TODO (backend): replace PLACEHOLDER_DASHBOARD_STATS with a real API hook, e.g.:
//   const stats = useStats();
const stats = PLACEHOLDER_DASHBOARD_STATS;

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const location = useLocation();

  // Helper to extract the base path segment
  const pathSegment = location.pathname.split('/')[1] || 'launchbay';

  const viewMeta: Record<string, { icon: React.ReactNode; label: string }> = {
    launchbay:  { icon: <Rocket   size={13} />, label: 'Launch Bay'  },
    missions:   { icon: <Compass  size={13} />, label: 'Missions'    },
    starters:   { icon: <Lightbulb size={13} />, label: 'Starter Projects' },
    loadout:    { icon: <Package  size={13} />, label: 'Loadout'     },
    achievements: { icon: <Activity size={13} />, label: 'Achievements' },
  };

  const currentMeta = viewMeta[pathSegment] || viewMeta.launchbay;

  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={onLogout} />

      <main className="dashboard-content">
        <div className="content-container">
          <div className="gc-breadcrumb">
            <span style={{ color: 'var(--text-dim)' }}>MAYDAY</span>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <span style={{ color: 'var(--amber)' }}>{currentMeta.label}</span>
          </div>


          {pathSegment === 'launchbay' && (
            <div className="gc-stat-bar">
              {/* Missions Launched + MAYDAY Balance live in the sidebar */}
              {stats.slice(2).map((s, i) => (
                <div key={i} className="gc-stat-card">
                  <div className="stat-label">{s.label}</div>
                  <div className={`stat-value ${s.cls}`}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
