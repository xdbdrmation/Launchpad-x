import React from 'react';
import '../../App.css';

// TODO (backend): fetch badges      → GET /api/me/badges
// TODO (backend): fetch activity    → GET /api/me/activity

const BADGE_SKELETON_COUNT   = 4;
const ACTIVITY_SKELETON_COUNT = 5;

const Achievements: React.FC = () => {
  return (
    <div className="view-content">
      <div className="view-header">
        <span className="section-code">Telemetry</span>
        <h1>Mission Log</h1>
        <p>Flight badges, activity, and your launch history.</p>
      </div>


      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            fontSize: 'var(--fs-small)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--text-muted)',
            marginBottom: '0.875rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Flight Badges
        </div>

        {/* Badge cards — replace with GET /api/me/badges response */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.875rem',
          }}
          aria-busy="true"
          aria-label="Loading flight badges"
        >
          {Array.from({ length: BADGE_SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className="compact-card"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.875rem',
                padding: '0.875rem 1.125rem',
              }}
            >

              <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 99, flexShrink: 0 }} />


              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div className="skeleton" style={{ width: 80, height: '0.75rem', borderRadius: 4 }} />
                <div className="skeleton" style={{ width: 120, height: '0.65rem', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>


      <div
        style={{
          fontSize: 'var(--fs-small)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          color: 'var(--text-muted)',
          marginBottom: '0.875rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Mission Log
      </div>

      {/* Activity items — replace with GET /api/me/activity response */}
      <div className="status-list" aria-busy="true" aria-label="Loading activity log">
        {Array.from({ length: ACTIVITY_SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="list-item">

            <div className="skeleton" style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0 }} />


            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div className="skeleton" style={{ width: '65%', height: '0.75rem', borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '45%', height: '0.65rem', borderRadius: 4 }} />
            </div>


            <div className="skeleton" style={{ width: 40, height: '0.65rem', borderRadius: 4, flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
