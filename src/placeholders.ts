/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BACKEND INTEGRATION PLACEHOLDERS
 * ─────────────────────────────────────────────────────────────────────────────
 * Every exported value in this file is a **stub** that should be replaced with
 * a real API call when connecting a backend.
 *
 * Suggested approach:
 *   1. Create a `useStats()`, `useProjects()`, `useShopItems()` … set of hooks
 *      that fetch from your API.
 *   2. Replace the import of `PLACEHOLDER_*` in each component with the hook.
 *   3. Delete this file once all placeholders are wired up.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Authenticated user ────────────────────────────────────────────────────────
export const PLACEHOLDER_USER = {
  name: 'Astronaut',                // GET /api/me → user.name
  handle: '@pilot',                 // GET /api/me → user.handle
  lpBalance: '—',                   // GET /api/me → user.lp_balance  (e.g. '12,400')
};

// ── Landing-page / public stats ───────────────────────────────────────────────
export const PLACEHOLDER_GLOBAL_STATS = {
  missionsFiled: '—',               // GET /api/stats → missions_filed
  submissionWindow: 'OPEN',         // GET /api/stats → submission_window ('OPEN' | 'CLOSED')
  lpOnTheLine: '∞',                 // GET /api/stats → lp_on_the_line
  participantCount: '—',            // GET /api/stats → participant_count
};

// ── Dashboard stats bar (Launch Bay) ─────────────────────────────────────────
export const PLACEHOLDER_DASHBOARD_STATS: Array<{
  label: string;
  value: string;
  cls: string;
}> = [
    { label: 'Missions Launched', value: '—', cls: 'red' },  // GET /api/me/stats → missions_launched
    { label: 'LP Balance', value: '—', cls: 'green' },  // GET /api/me       → lp_balance
    { label: 'Active Missions', value: '—', cls: 'blue' },  // GET /api/stats     → active_missions
    { label: 'Badges Earned', value: '—', cls: '' },  // GET /api/me/badges → earned/total
  ];

// ── User's own submitted projects (Ship / Launch Bay) ────────────────────────
export interface Project {
  id: string;
  name: string;
  description: string;
  repo: string;
  readme: string;
  imageUrl?: string;
  status: 'reviewing' | 'deployed' | 'rejected';
  submittedAt: string;
}

export const PLACEHOLDER_PROJECTS: Project[] = [
  // GET /api/me/projects → array of Project objects
  // Remove these stubs and replace with the API response.
  {
    id: 'placeholder-1',
    name: 'Example Project',
    description: 'This is a placeholder project. Connect to the backend to load real data.',
    repo: 'https://github.com/example/project',
    readme: 'https://raw.githubusercontent.com/example/project/main/README.md',
    status: 'reviewing',
    submittedAt: '—',
  },
];

// ── Community / explore builds (Explore / Mission Directory) ─────────────────
export interface Build {
  name: string;
  creator: string;
  status: 'Deployed' | 'Reviewing' | 'Rejected';
  description: string;
  tech: string;
}

export const PLACEHOLDER_BUILDS: Build[] = [
  // GET /api/projects → array of Build objects
  {
    name: 'placeholder-build',
    creator: '—',
    status: 'Reviewing',
    description: 'Connect to the backend to load community projects.',
    tech: '—',
  },
];

// ── Shop / Loadout items ──────────────────────────────────────────────────────
export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  qty: number;         // GET /api/shop/:id → qty_in_stock
  cost: string;        // GET /api/shop/:id → lp_cost  (e.g. '1,200 LP')
  iconKey: string;     // maps to a local icon component — keep client-side
  iconBg: string;
  iconColor: string;
}

export const PLACEHOLDER_SHOP_ITEMS: ShopItem[] = [
  // GET /api/shop → array of ShopItem objects
  {
    id: 'PATCH-01',
    name: 'Mission Patch',
    desc: 'Embroidered Launchpad mission patch — iron-on for your launch-day jacket.',
    qty: 0,           // placeholder: real stock from backend
    cost: '— LP',     // placeholder: real cost from backend
    iconKey: 'sticker',
    iconBg: 'rgba(56, 189, 248, 0.15)',
    iconColor: '#38bdf8',
  },
  {
    id: 'STK-09',
    name: 'Sticker Pack',
    desc: 'Set of 12 vinyl stickers: rockets, orbits, and mission badges.',
    qty: 0,
    cost: '— LP',
    iconKey: 'sticker',
    iconBg: 'rgba(249, 115, 22, 0.14)',
    iconColor: '#fb923c',
  },
  {
    id: 'HW-44',
    name: 'Mechanical Keyboard',
    desc: 'Tactile clicky 65% keyboard — because great launches start with great typing.',
    qty: 0,
    cost: '— LP',
    iconKey: 'cpu',
    iconBg: 'rgba(167, 139, 250, 0.15)',
    iconColor: '#a78bfa',
  },
  {
    id: 'SBC-12',
    name: 'Raspberry Pi 5',
    desc: '4GB RAM single-board computer. Build your mission control from scratch.',
    qty: 0,
    cost: '— LP',
    iconKey: 'radio',
    iconBg: 'rgba(34, 211, 165, 0.14)',
    iconColor: '#22d3a5',
  },
  {
    id: 'TOOL-22',
    name: 'Soldering Kit',
    desc: 'Full starter soldering kit for hardware hackers.',
    qty: 0,
    cost: '— LP',
    iconKey: 'wrench',
    iconBg: 'rgba(251, 191, 36, 0.14)',
    iconColor: '#fbbf24',
  },
  {
    id: 'PWR-05',
    name: 'USB-C Hub',
    desc: '7-in-1 hub: HDMI, SD, Ethernet, USB-A x3. Mission-ready connectivity.',
    qty: 0,
    cost: '— LP',
    iconKey: 'zap',
    iconBg: 'rgba(249, 115, 22, 0.12)',
    iconColor: '#f97316',
  },
];

// ── Telemetry / activity log (Achievements) ───────────────────────────────────
export type ActivityType = 'SUCCESS' | 'WARNING' | 'INFO' | 'SYSTEM';

export interface ActivityItem {
  type: ActivityType;
  message: string;
  time: string;
  detail?: string;
}

export const PLACEHOLDER_ACTIVITY_LOG: ActivityItem[] = [
  // GET /api/me/activity → array of ActivityItem objects
  {
    type: 'INFO',
    message: 'Backend pending...',
    time: '—',
  },
];

// ── Flight badges / achievements ──────────────────────────────────────────────
export interface Achievement {
  iconKey: string;   // maps to a local icon — keep client-side
  label: string;
  desc: string;
  earned: boolean;   // GET /api/me/badges → earned bool per badge
  color: string;
}

export const PLACEHOLDER_ACHIEVEMENTS: Achievement[] = [
  // GET /api/me/badges → array of Achievement objects
  { iconKey: 'zap', label: 'First Launch', desc: 'Submit your first mission', earned: false, color: '#f97316' },
  { iconKey: 'star', label: 'Scout', desc: 'Browse 10 missions', earned: false, color: '#fbbf24' },
  { iconKey: 'trophy', label: 'Orbit Club', desc: 'Get 3 missions deployed', earned: false, color: '#a78bfa' },
  { iconKey: 'checkCircle2', label: 'Clean Burn', desc: 'No rejected submissions', earned: false, color: '#22d3a5' },
];

// ── Starter Projects ────────────────────────────────────────────────────────
export interface Starter {
  title: string;
  description: string;
  tech: string;
  repo: string;
}

export const PLACEHOLDER_STARTERS: Starter[] = [
  {
    title: 'Simple API Proxy',
    description: 'A proxy server setup to safely store API keys and manage external requests.',
    tech: 'Node.js',
    repo: 'https://github.com/hackclub/api-proxy-starter'
  },
  {
    title: 'React Dashboard',
    description: 'A pre-configured React app with routing and modern UI components.',
    tech: 'React',
    repo: 'https://github.com/hackclub/react-starter'
  },
  {
    title: 'Discord Bot',
    description: 'A basic Discord bot structure using Discord.js ready for your custom commands.',
    tech: 'JavaScript',
    repo: 'https://github.com/hackclub/discord-bot-starter'
  }
];
