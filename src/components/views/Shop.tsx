import React from 'react';
import { Zap } from 'lucide-react';
import '../../App.css';

// TODO (backend): fetch shop items  → GET /api/shop
// TODO (backend): fetch LP balance  → GET /api/me → lp_balance

const SKELETON_COUNT = 6;

const Shop: React.FC = () => {
  return (
    <div className="view-content">
      <div className="view-header-row">
        <div className="view-header" style={{ margin: 0 }}>
          <span className="section-code">Loadout</span>
          <h1>Mission Loadout</h1>
          <p>Redeem Launchpad Points for hardware and mission swag.</p>
        </div>

        {/* LP balance badge — replace skeleton with real value once API is wired */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="hc-badge" style={{ gap: 6 }}>
            <Zap size={11} />
            <span
              className="skeleton"
              style={{ width: 56, height: '0.75rem', borderRadius: 4, display: 'inline-block' }}
              aria-label="Loading LP balance"
            />
          </div>
        </div>
      </div>

      {/* Item cards — replace with real items from GET /api/shop */}
      <div className="compact-grid" aria-busy="true" aria-label="Loading shop items">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="compact-card" style={{ gap: '1rem' }}>


            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
              <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 8, flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="skeleton" style={{ width: '40%', height: '0.6rem', borderRadius: 4 }} />
                <div className="skeleton" style={{ width: '70%', height: '0.85rem', borderRadius: 4 }} />
              </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexGrow: 1 }}>
              <div className="skeleton" style={{ width: '100%', height: '0.7rem', borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '80%', height: '0.7rem', borderRadius: 4 }} />
            </div>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div className="skeleton" style={{ width: 64, height: '0.8rem', borderRadius: 4 }} />
                <div className="skeleton" style={{ width: 48, height: '0.65rem', borderRadius: 4 }} />
              </div>
              <div className="skeleton" style={{ width: 80, height: 32, borderRadius: 6 }} />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
