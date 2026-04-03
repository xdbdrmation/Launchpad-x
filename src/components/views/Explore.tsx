import React, { useState } from 'react';
import { ExternalLink, Eye, Globe, Code2 } from 'lucide-react';
import { PLACEHOLDER_BUILDS } from '../../placeholders';
import type { Build } from '../../placeholders';
import '../../App.css';

// TODO (backend): replace PLACEHOLDER_BUILDS with a real API hook, e.g.:
//   const builds = useAllProjects(); // GET /api/projects
type Status = Build['status'];
const builds = PLACEHOLDER_BUILDS;

const Explore: React.FC = () => {
  const [filter, setFilter] = useState<'All' | Status>('All');

  const filtered = filter === 'All' ? builds : builds.filter((b) => b.status === filter);

  return (
    <div className="view-content">
      <div className="view-header-row">
        <div className="view-header" style={{ margin: 0 }}>
          <span className="section-code">Mission Directory</span>
          <h1>All Builds</h1>
          <p>Every project launched by hackathon participants.</p>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(['All', 'Deployed', 'Reviewing', 'Rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={filter === s ? 'btn-primary' : 'btn-secondary'}
              style={{ height: 36, fontSize: 'var(--fs-small)' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="compact-grid">
        {filtered.map((build, i) => (
          <div key={i} className="compact-card" role="article">
            <div className="card-header">
              <span className={`status-tag ${build.status.toLowerCase()}`}>
                {build.status}
              </span>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)' }}>
                <Code2 size={11} />
                {build.tech}
              </span>
            </div>

            <div>
              <div className="card-title">{build.name}</div>
              <div className="card-subtitle" style={{ marginTop: '3px' }}>
                @{build.creator}
              </div>
            </div>

            <p style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)', lineHeight: 1.55, flexGrow: 1 }}>
              {build.description}
            </p>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="action-btn primary-outline"
                style={{ flex: 1 }}
                aria-label={`View mission ${build.name}`}
              >
                <Eye size={13} />
                View Mission
              </button>
              <button
                className="action-btn"
                style={{ width: 38, padding: '0' }}
                aria-label={`Open ${build.name} externally`}
              >
                <ExternalLink size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
          <Globe size={36} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
          <p style={{ fontWeight: 'bold' }}>No missions match this filter.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
