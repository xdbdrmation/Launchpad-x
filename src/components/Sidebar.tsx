import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket, Compass, Package, Activity, LogOut, Lightbulb } from 'lucide-react';
import '../App.css';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const menuItems = [
    { id: 'launchbay',  icon: <Rocket  size={16} />, label: 'Launch Bay'  },
    { id: 'missions',   icon: <Compass size={16} />, label: 'Missions'    },
    { id: 'starters',   icon: <Lightbulb size={16} />, label: 'Starter Projects' },
    { id: 'loadout',    icon: <Package size={16} />, label: 'Loadout'     },
    { id: 'telemetry',  icon: <Activity size={16} />, label: 'Telemetry'   },
  ];

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon" aria-hidden="true">
            <Rocket size={13} strokeWidth={2.5} />
          </div>
          <div className="sidebar-wordmark">
            Launch<span>pad</span>
            <div className="sidebar-affiliation-tag">Hack Club · YSWS</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>
        {menuItems.map((item, i) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
            title={item.label}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {item.icon}
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="nav-item-logout"
          onClick={onLogout}
          aria-label="Abort mission / sign out"
          title="Sign out"
        >
          <LogOut size={15} />
          <span className="nav-label">Abort Mission</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
