import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket, Compass, Package, Activity, LogOut, Lightbulb } from 'lucide-react';
import { PLACEHOLDER_DASHBOARD_STATS } from '../placeholders';
import '../App.css';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const menuItems = [
    { id: 'launchbay',    icon: <Rocket    size={15} />, label: 'Launch Bay'   },
    { id: 'missions',     icon: <Compass   size={15} />, label: 'Missions'     },
    { id: 'starters',     icon: <Lightbulb size={15} />, label: 'Starters'     },
    { id: 'loadout',      icon: <Package   size={15} />, label: 'Loadout'      },
    { id: 'achievements', icon: <Activity  size={15} />, label: 'Achievements' },
  ];

  // Missions Launched + MAYDAY Balance (indexes 0 & 1)
  const sidebarStats = PLACEHOLDER_DASHBOARD_STATS.slice(0, 2);

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-header">
        <div className="sidebar-wordmark">MAYDAY</div>
        <div className="sidebar-terminal-alpha">New Mexico</div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User stats pinned above logout */}
      <div className="sidebar-stats">
        {sidebarStats.map((s) => (
          <div key={s.label} className="sidebar-stat-item">
            <span className="sidebar-stat-label">{s.label}</span>
            <span className="sidebar-stat-value">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="nav-item-logout">
          <LogOut size={14} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
