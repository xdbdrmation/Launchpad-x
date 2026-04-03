import React from 'react';
import '../../App.css';

// TODO (backend): fetch starter projects list from your API
const SKELETON_COUNT = 3;

const StarterProjects: React.FC = () => {
  return (
    <div className="view-fade-in">
      <div className="view-header">
        <span className="section-code">PRJ-01</span>
        <h1>Starter Projects</h1>
        <p>Fork these repositories to quickly bootstrap your next mission.</p>
      </div>

      <div className="compact-grid" aria-busy="true" aria-label="Loading starter projects">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="compact-card" style={{ gap: '0.875rem' }}>
            <div className="card-header">
              <div className="skeleton" style={{ width: '60%', height: '1.25rem', borderRadius: 4 }} />
              <div className="skeleton" style={{ width: 44, height: 16, borderRadius: 2 }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1rem', flex: 1 }}>
              <div className="skeleton" style={{ width: '100%', height: '0.8rem', borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '90%', height: '0.8rem', borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '50%', height: '0.8rem', borderRadius: 4 }} />
            </div>

            <div className="skeleton" style={{ width: '100%', height: 32, borderRadius: 5 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarterProjects;
