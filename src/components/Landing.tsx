import React from 'react';
import { motion } from 'framer-motion';
import rocketBg from '../assets/rocket_bg.jpeg';
import { PLACEHOLDER_GLOBAL_STATS } from '../placeholders';
import '../App.css';

interface LandingProps {
  onLogin: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  return (
    <div className="landing-container">
      <img src={rocketBg} alt="" aria-hidden="true" className="rocket-bg" />
      <div className="landing-overlay" aria-hidden="true" />

      <header className="landing-nav" role="banner">
        <span className="landing-nav-brand">MAYDAY</span>
        <span className="landing-nav-tag">Hack Club · YSWS</span>
      </header>

      <motion.main
        className="landing-main"
        role="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.h1
          className="gc-title-massive"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease }}
        >
          MAYDAY
        </motion.h1>

        <div className="gc-landing-grid">

          {/* Left — mission briefing module */}
          <motion.div
            className="gc-column"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease }}
          >
            <div className="gc-module">
              <div className="gc-label-sticker">What do I even do?</div>
              <p className="landing-tagline">
                Build something real. Deploy it. Earn MAYDAY Points and redeem them for hardware.
              </p>
              <div className="landing-stats">
                <div className="landing-stat">
                  {/* TODO (backend): GET /api/stats → missions_filed */}
                  <div className="stat-value">{PLACEHOLDER_GLOBAL_STATS.missionsFiled}</div>
                  <div className="stat-label">Projects filed</div>
                </div>
                <div className="landing-stat">
                  {/* TODO (backend): GET /api/stats → submission_window */}
                  <div className={`stat-value${PLACEHOLDER_GLOBAL_STATS.submissionWindow === 'OPEN' ? ' stat-open' : ''}`}>
                    {PLACEHOLDER_GLOBAL_STATS.submissionWindow}
                  </div>
                  <div className="stat-label">Window</div>
                </div>
                <div className="landing-stat">
                  {/* TODO (backend): GET /api/stats → participant_count */}
                  <div className="stat-value">{PLACEHOLDER_GLOBAL_STATS.participantCount}</div>
                  <div className="stat-label">Builders</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — access terminal module (light) */}
          <motion.div
            className="gc-module gc-module-light gc-auth-module"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.26, ease }}
          >
            <div
              className="gc-label-sticker"
              style={{ background: '#000', color: 'var(--amber)' }}
            >
              Get Started
            </div>

            <div className="auth-label">// Login</div>

            <p className="auth-description">
              Sign in with your Hack Club account to join the fleet and start tracking your builds.
            </p>

            <button
              className="gc-btn-block"
              onClick={onLogin}
              aria-label="Sign in with Hack Club"
              id="auth-btn"
            >
              <img
                src="https://assets.hackclub.com/icon-square.svg"
                alt=""
                aria-hidden="true"
                className="hc-icon"
              />
              <div className="gc-btn-text-container">
                <span className="gc-btn-subtext">Continue with</span>
                <span className="gc-btn-maintext">Hack Club</span>
              </div>
            </button>

            <p className="auth-note">
              MAYDAY is a YSWS program fiscally sponsored by Hack Club.
            </p>
          </motion.div>

        </div>
      </motion.main>

      <footer className="landing-footer" role="contentinfo">
        <span>© 2026 MAYDAY</span>
        <span className="landing-footer-sep" aria-hidden="true" />
        <span>
          <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>Fiscally sponsored</span>
          {' '}by{' '}
          <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer">Hack Club</a>
        </span>
      </footer>
    </div>
  );
};

export default Landing;
