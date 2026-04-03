import React from 'react';
import { motion } from 'framer-motion';
import rocketBg from '../assets/rocket_bg.png';
import { PLACEHOLDER_GLOBAL_STATS } from '../placeholders';
import '../App.css';

interface LandingProps {
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  return (
    <div className="landing-container">
      <img src={rocketBg} alt="" aria-hidden="true" className="rocket-bg" />


      <header className="landing-nav" role="banner">
        <span className="landing-nav-brand">Launchpad</span>
        <div className="landing-nav-right">
          <span className="landing-nav-tag">Hack Club · YSWS</span>
        </div>
      </header>


      <motion.main
        className="landing-panel"
        role="main"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="panel-body">

          <motion.div
            className="panel-mission"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mission-eyebrow">YSWS · 2026</p>

            <h1 className="panel-main-title">
              Launch<span>pad</span>
            </h1>

            <p className="panel-tagline">
              Build something real. Deploy it. Earn Launchpad Points and redeem them for hardware.
            </p>

            <div className="panel-readouts">
              <div className="panel-readout">
                {/* TODO (backend): GET /api/stats → missions_filed */}
                <div className="readout-val">{PLACEHOLDER_GLOBAL_STATS.missionsFiled}</div>
                <div className="readout-label">Projects submitted</div>
              </div>
              <div className="readout-divider" aria-hidden="true" />
              <div className="panel-readout">
                {/* TODO (backend): GET /api/stats → submission_window */}
                <div className="readout-val active-val">{PLACEHOLDER_GLOBAL_STATS.submissionWindow}</div>
                <div className="readout-label">Window</div>
              </div>
              <div className="readout-divider" aria-hidden="true" />
              <div className="panel-readout">
                {/* TODO (backend): GET /api/stats → participant_count */}
                <div className="readout-val">{PLACEHOLDER_GLOBAL_STATS.participantCount}</div>
                <div className="readout-label">Participants</div>
              </div>
            </div>
          </motion.div>


          <div className="panel-divider" aria-hidden="true" />


          <motion.div
            className="panel-auth"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="auth-label">Get started</div>
            <p className="auth-description">
              Sign in with your Hack Club account to join and start tracking your builds.
            </p>

            <button
              className="hc-login-btn"
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
              <span>Sign in with Hack Club</span>
            </button>

            <p className="auth-note">
              Launchpad is a YSWS program fiscally sponsored by Hack Club.
            </p>
          </motion.div>
        </div>
      </motion.main>


      <footer className="landing-footer" role="contentinfo">
        <span>© 2026 Launchpad</span>
        <span className="landing-footer-sep" aria-hidden="true" />
        <span><span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>Fiscally sponsored</span> by <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer">Hack Club</a></span>
      </footer>
    </div>
  );
};

export default Landing;
