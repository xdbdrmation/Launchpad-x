# Launchpad — Backend Integration Guide

> **Audience:** Backend developers wiring up the Launchpad API.
> **Frontend stack:** React + TypeScript (Vite), served at `http://localhost:5173` during development.
> All placeholder values live in [`src/placeholders.ts`](./src/placeholders.ts).
> Every skeleton UI has a `// TODO (backend):` comment pointing to the exact endpoint required.

---

## Table of Contents

1. [Auth Flow](#1-auth-flow)
2. [Base URL & Headers](#2-base-url--headers)
3. [API Endpoints](#3-api-endpoints)
   - [Public / Stats](#31-public--stats)
   - [Auth / Me](#32-auth--me)
   - [Projects (user-owned)](#33-projects-user-owned)
   - [Community Builds (explore)](#34-community-builds-explore)
   - [Shop / Loadout](#35-shop--loadout)
   - [Telemetry / Activity](#36-telemetry--activity)
   - [Badges / Achievements](#37-badges--achievements)
4. [Data Schemas](#4-data-schemas)
5. [Frontend Integration Checklist](#5-frontend-integration-checklist)
6. [Error Handling Conventions](#6-error-handling-conventions)

---

## 1. Auth Flow

The frontend currently stubs authentication with a single boolean (`isAuthenticated` in `App.tsx`).
The login button on the Landing page calls `onLogin()`, which flips that flag.

**What needs to happen instead:**

1. User clicks **"Sign in with Hack Club"** (`#auth-btn` on Landing page).
2. Frontend redirects to / opens the Hack Club OAuth 2.0 authorization URL.
3. Hack Club redirects back to the frontend callback route with a `code` query parameter.
4. Frontend POSTs the `code` to `POST /api/auth/callback` on the backend.
5. Backend exchanges the code for a Hack Club access token, looks up / creates the user record, and returns a session token (JWT or cookie).
6. Frontend stores the session token and transitions to the authenticated Dashboard.
7. On logout, frontend calls `DELETE /api/auth/session` and clears the stored token.

### Endpoints required

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/callback` | Exchange Hack Club OAuth `code` for a session token |
| `DELETE` | `/api/auth/session` | Sign out / invalidate session |

### Hack Club OAuth notes

- Provider: [Hack Club Auth](https://hackclub.com/auth/)
- Scopes needed: `read:profile` (at minimum)
- The login button currently points nowhere — update `onLogin` in `Landing.tsx` to trigger the redirect.

---

## 2. Base URL & Headers

```
Base URL (dev):  http://localhost:3000   (or whichever port the backend runs on)
Base URL (prod): https://api.launchpad.example.com
```

All authenticated requests must include:

```http
Authorization: Bearer <session_token>
Content-Type: application/json
```

All responses should be JSON with the shape:

```json
{
  "data": { ... },
  "error": null
}
```

or on failure:

```json
{
  "data": null,
  "error": { "code": "NOT_FOUND", "message": "Resource not found" }
}
```

---

## 3. API Endpoints

### 3.1 Public / Stats

Used by: **Landing page** (`Landing.tsx`) and **Dashboard stats bar** (`Dashboard.tsx`)

---

#### `GET /api/stats`

Returns global platform statistics. No authentication required.

**Response**

```json
{
  "data": {
    "missions_filed": 847,
    "active_missions": 12,
    "submission_window": "OPEN",
    "lp_on_the_line": 50000,
    "participant_count": 847
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `missions_filed` | `number` | Total projects ever submitted |
| `active_missions` | `number` | Projects currently under review |
| `submission_window` | `"OPEN" \| "CLOSED"` | Whether new submissions are accepted |
| `lp_on_the_line` | `number` | Total LP available |
| `participant_count` | `number` | Registered users |

**Frontend mapping**

| Response field | Frontend constant | Rendered in |
|----------------|-------------------|-------------|
| `missions_filed` | `PLACEHOLDER_GLOBAL_STATS.missionsFiled` | Landing readout |
| `submission_window` | `PLACEHOLDER_GLOBAL_STATS.submissionWindow` | Landing readout |
| `lp_on_the_line` | `PLACEHOLDER_GLOBAL_STATS.lpOnTheLine` | Landing readout |
| `participant_count` | `PLACEHOLDER_GLOBAL_STATS.participantCount` | Landing auth status |
| `active_missions` | `PLACEHOLDER_DASHBOARD_STATS[2].value` | Dashboard stats bar |

---

### 3.2 Auth / Me

Used by: **Dashboard stats bar**, **Shop LP badge** (`Shop.tsx`)

---

#### `GET /api/me`

Returns the authenticated user's profile. Requires auth.

**Response**

```json
{
  "data": {
    "id": "usr_abc123",
    "name": "Ada Lovelace",
    "handle": "ada",
    "email": "ada@example.com",
    "lp_balance": 12400,
    "avatar_url": "https://avatars.hackclub.com/ada.png"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Internal user ID |
| `name` | `string` | Display name |
| `handle` | `string` | Username / Hack Club handle (no `@`) |
| `lp_balance` | `number` | Current Launchpad Points balance |
| `avatar_url` | `string \| null` | Profile picture URL |

**Frontend mapping**

| Response field | Frontend constant | Rendered in |
|----------------|-------------------|-------------|
| `name` | `PLACEHOLDER_USER.name` | Sidebar (future) |
| `handle` | `PLACEHOLDER_USER.handle` | Sidebar (future) |
| `lp_balance` | `PLACEHOLDER_USER.lpBalance` + `PLACEHOLDER_DASHBOARD_STATS[1].value` | Shop LP badge, Dashboard stats bar |

---

#### `GET /api/me/stats`

Per-user stats for the Dashboard stats bar. Requires auth.

**Response**

```json
{
  "data": {
    "missions_launched": 3,
    "lp_balance": 12400
  }
}
```

**Frontend mapping**

| Response field | Frontend placeholder | Rendered in |
|----------------|----------------------|-------------|
| `missions_launched` | `PLACEHOLDER_DASHBOARD_STATS[0].value` | Dashboard stats bar — "Missions Launched" |
| `lp_balance` | `PLACEHOLDER_DASHBOARD_STATS[1].value` | Dashboard stats bar — "LP Balance" |

> **Note:** `lp_balance` is duplicated from `GET /api/me` — you may choose to derive it from there instead.

---

### 3.3 Projects (user-owned)

Used by: **Launch Bay / Ship** (`Ship.tsx`)

---

#### `GET /api/me/projects`

Returns all projects submitted by the authenticated user. Requires auth.

**Response**

```json
{
  "data": [
    {
      "id": "proj_xyz",
      "name": "Orbit Chat",
      "description": "A real-time P2P messaging app built with WebRTC and React.",
      "repo": "https://github.com/ada/orbit-chat",
      "readme": "https://raw.githubusercontent.com/ada/orbit-chat/main/README.md",
      "image_url": null,
      "status": "deployed",
      "submitted_at": "2025-04-01T15:30:00Z"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique project ID |
| `name` | `string` | Project name (3–40 chars) |
| `description` | `string` | Short mission brief (10–200 chars) |
| `repo` | `string` | GitHub repository URL (`https://github.com/…`) |
| `readme` | `string` | Direct README URL (auto-derived from repo on frontend) |
| `image_url` | `string \| null` | Cover / screenshot image URL |
| `status` | `"reviewing" \| "deployed" \| "rejected"` | Review status |
| `submitted_at` | `string` | ISO 8601 timestamp |

---

#### `POST /api/me/projects`

Submit a new project for review. Requires auth.

**Request body**

```json
{
  "name": "Orbit Chat",
  "description": "A real-time P2P messaging app built with WebRTC.",
  "repo": "https://github.com/ada/orbit-chat",
  "readme": "https://raw.githubusercontent.com/ada/orbit-chat/main/README.md",
  "image_url": null
}
```

**Validation (mirrors frontend)**

| Field | Rules |
|-------|-------|
| `name` | Required, 3–40 characters |
| `description` | Required, 10–200 characters |
| `repo` | Required, must be a valid `https://github.com/` URL |
| `readme` | Optional, URL; auto-derived by frontend from repo |
| `image_url` | Optional, URL; uploaded by frontend separately (see image upload) |

**Success response** — `201 Created`

```json
{
  "data": {
    "id": "proj_new123",
    "status": "reviewing",
    "submitted_at": "2025-04-02T10:00:00Z"
  }
}
```

**Validation error response** — `422 Unprocessable Entity`

```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Description must be at least 10 characters."
  }
}
```

---

#### `POST /api/me/projects/:id/image`

Upload a project screenshot or cover image. Requires auth.

- **Content-Type:** `multipart/form-data`
- **Field name:** `image`
- **Max size:** 10 MB
- **Accepted types:** `image/jpeg`, `image/png`, `image/gif`, `image/webp`

**Success response** — `200 OK`

```json
{
  "data": {
    "image_url": "https://cdn.launchpad.example.com/projects/proj_xyz/cover.jpg"
  }
}
```

---

### 3.4 Community Builds (explore)

Used by: **Mission Directory / Explore** (`Explore.tsx`)

---

#### `GET /api/projects`

Returns all **deployed / public** projects across all users. No authentication required (or optionally authenticated for richer data).

**Query parameters**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `status` | `"Deployed" \| "Reviewing" \| "Rejected" \| "All"` | `"All"` | Filter by status |
| `page` | `number` | `1` | Pagination page |
| `per_page` | `number` | `20` | Results per page |

**Response**

```json
{
  "data": [
    {
      "name": "rover-ui-beta",
      "creator": "spacelover",
      "status": "Deployed",
      "description": "A Mars rover telemetry dashboard built with React and WebSockets.",
      "tech": "React"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 847
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Project / repo name |
| `creator` | `string` | Submitter's handle (no `@`) |
| `status` | `"Deployed" \| "Reviewing" \| "Rejected"` | Review status |
| `description` | `string` | Short description |
| `tech` | `string` | Primary tech / language |

> **Note:** The frontend currently filters client-side after fetching all builds. For production, pass the `status` query param to filter server-side.

---

### 3.5 Shop / Loadout

Used by: **Mission Loadout / Shop** (`Shop.tsx`)

---

#### `GET /api/shop`

Returns all available shop / loadout items. No authentication required.

**Response**

```json
{
  "data": [
    {
      "id": "PATCH-01",
      "name": "Mission Patch",
      "desc": "Embroidered Launchpad mission patch — iron-on for your launch-day jacket.",
      "qty_in_stock": 42,
      "lp_cost": 1200,
      "icon_key": "sticker",
      "icon_bg": "rgba(56, 189, 248, 0.15)",
      "icon_color": "#38bdf8"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | SKU / item ID (e.g. `PATCH-01`) |
| `name` | `string` | Display name |
| `desc` | `string` | Item description |
| `qty_in_stock` | `number` | Current inventory count (`0` = out of stock) |
| `lp_cost` | `number` | Cost in Launchpad Points |
| `icon_key` | `"sticker" \| "cpu" \| "radio" \| "wrench" \| "zap"` | Key mapping to a Lucide icon (resolved client-side) |
| `icon_bg` | `string` | CSS rgba background for the icon circle |
| `icon_color` | `string` | CSS hex color for the icon |

> **`icon_key` values** map to Lucide React icons in the frontend:
> `sticker → Sticker`, `cpu → Cpu`, `radio → Radio`, `wrench → Wrench`, `zap → Zap`

---

#### `POST /api/shop/:id/redeem`

Redeem a shop item using LP. Requires auth.

**Request body** — none (item ID is in path)

**Success response** — `200 OK`

```json
{
  "data": {
    "order_id": "ord_abc123",
    "item_id": "PATCH-01",
    "lp_spent": 1200,
    "new_lp_balance": 11200
  }
}
```

**Error cases**

| HTTP | Code | Scenario |
|------|------|----------|
| `402` | `INSUFFICIENT_LP` | User doesn't have enough LP |
| `409` | `OUT_OF_STOCK` | `qty_in_stock` is `0` |

---

### 3.6 Telemetry / Activity

Used by: **Mission Log / Achievements** (`Achievements.tsx`)

---

#### `GET /api/me/activity`

Returns the authenticated user's recent activity log. Requires auth.

**Query parameters**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | `number` | `20` | Max items to return |

**Response**

```json
{
  "data": [
    {
      "type": "SUCCESS",
      "message": "Mission \"orbit-chat\" cleared for deployment.",
      "time": "2h ago",
      "detail": "Passed all review checks."
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"SUCCESS" \| "WARNING" \| "INFO" \| "SYSTEM"` | Drives the icon and color in the UI |
| `message` | `string` | Primary activity message |
| `time` | `string` | Human-readable relative time (e.g. `"2h ago"`, `"3d ago"`) |
| `detail` | `string \| null` | Optional secondary detail line |

**`type` → icon mapping (client-side)**

| `type` | Icon | CSS class |
|--------|------|-----------|
| `SUCCESS` | `CheckCircle2` | `.success` |
| `WARNING` | `AlertTriangle` | `.warning` |
| `INFO` | `Info` | `.info` |
| `SYSTEM` | `Clock` | `.system` |

---

### 3.7 Badges / Achievements

Used by: **Mission Log / Achievements** (`Achievements.tsx`) and **Dashboard stats bar**

---

#### `GET /api/me/badges`

Returns all badges and which ones the user has earned. Requires auth.

**Response**

```json
{
  "data": [
    {
      "icon_key": "zap",
      "label": "First Launch",
      "desc": "Submit your first mission",
      "earned": true,
      "color": "#f97316"
    },
    {
      "icon_key": "star",
      "label": "Scout",
      "desc": "Browse 10 missions",
      "earned": false,
      "color": "#fbbf24"
    },
    {
      "icon_key": "trophy",
      "label": "Orbit Club",
      "desc": "Get 3 missions deployed",
      "earned": false,
      "color": "#a78bfa"
    },
    {
      "icon_key": "checkCircle2",
      "label": "Clean Burn",
      "desc": "No rejected submissions",
      "earned": false,
      "color": "#22d3a5"
    }
  ],
  "meta": {
    "earned": 1,
    "total": 4
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `icon_key` | `"zap" \| "star" \| "trophy" \| "checkCircle2"` | Maps to a Lucide icon client-side |
| `label` | `string` | Badge display name |
| `desc` | `string` | Unlock condition description |
| `earned` | `boolean` | Whether this user has unlocked it |
| `color` | `string` | Accent color hex |

> **`meta.earned / meta.total`** drives the Dashboard stats bar "Badges Earned" tile — formatted as `"1 / 4"`.

**`icon_key` → Lucide icon (client-side)**

| `icon_key` | Icon |
|------------|------|
| `zap` | `Zap` |
| `star` | `Star` |
| `trophy` | `Trophy` |
| `checkCircle2` | `CheckCircle2` |

---

## 4. Data Schemas

### TypeScript interfaces (from `src/placeholders.ts`)

```typescript
// Authenticated user
interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  lp_balance: number;
  avatar_url: string | null;
}

// User project submission
interface Project {
  id: string;
  name: string;
  description: string;
  repo: string;
  readme: string;
  image_url?: string | null;
  status: 'reviewing' | 'deployed' | 'rejected';
  submitted_at: string; // ISO 8601
}

// Community build (explore view)
interface Build {
  name: string;
  creator: string;            // handle, no @
  status: 'Deployed' | 'Reviewing' | 'Rejected';
  description: string;
  tech: string;
}

// Shop item
interface ShopItem {
  id: string;
  name: string;
  desc: string;
  qty_in_stock: number;
  lp_cost: number;
  icon_key: string;
  icon_bg: string;
  icon_color: string;
}

// Activity log item
interface ActivityItem {
  type: 'SUCCESS' | 'WARNING' | 'INFO' | 'SYSTEM';
  message: string;
  time: string;             // human-relative, e.g. "2h ago"
  detail?: string | null;
}

// Badge / achievement
interface Achievement {
  icon_key: string;
  label: string;
  desc: string;
  earned: boolean;
  color: string;            // CSS hex
}
```

---

## 5. Frontend Integration Checklist

Use this to track which placeholders have been replaced:

- [ ] **`GET /api/stats`** → Replace `PLACEHOLDER_GLOBAL_STATS` in `Landing.tsx` and `PLACEHOLDER_DASHBOARD_STATS[2]` in `Dashboard.tsx`
- [ ] **`GET /api/me`** → Replace `PLACEHOLDER_USER` (used in `Shop.tsx` LP badge, and eventually Sidebar)
- [ ] **`GET /api/me/stats`** → Replace `PLACEHOLDER_DASHBOARD_STATS[0]` and `[1]` in `Dashboard.tsx`
- [ ] **`GET /api/me/projects`** → Replace `PLACEHOLDER_PROJECTS` in `Ship.tsx`
- [ ] **`POST /api/me/projects`** → Replace the `setTimeout` stub in `Ship.tsx#handleSubmit`
- [ ] **`POST /api/me/projects/:id/image`** → Wire up the image upload area in `Ship.tsx`
- [ ] **`GET /api/projects`** → Replace `PLACEHOLDER_BUILDS` in `Explore.tsx`
- [ ] **`GET /api/shop`** → Wire up real items in `Shop.tsx` (currently showing skeletons)
- [ ] **`POST /api/shop/:id/redeem`** → Wire up the Redeem button in `Shop.tsx`
- [ ] **`GET /api/me/activity`** → Wire up real activity in `Achievements.tsx` (currently showing skeletons)
- [ ] **`GET /api/me/badges`** → Wire up real badges in `Achievements.tsx` (currently showing skeletons)
- [ ] **Auth flow** → Replace the `isAuthenticated` boolean in `App.tsx` with real OAuth + session token logic
- [ ] **`DELETE /api/placeholders.ts`** → Delete once all placeholders are replaced

---

## 6. Error Handling Conventions

| HTTP Status | Meaning | Frontend action |
|-------------|---------|-----------------|
| `200 / 201` | Success | Render data |
| `400` | Bad request / validation | Show inline form error |
| `401` | Unauthenticated | Redirect to Landing / trigger login |
| `402` | Insufficient LP | Show error in Redeem flow |
| `403` | Forbidden | Show "Access denied" message |
| `404` | Not found | Show empty state |
| `409` | Conflict (e.g. out of stock) | Disable Redeem button, show error |
| `422` | Validation error | Mirror the `error.message` in form feedback |
| `429` | Rate limited | Pause and retry / show toast |
| `500` | Server error | Show generic error toast |

> The project submission form (`Ship.tsx`) currently renders `feedback.message` directly from a hardcoded string. Replace those strings with error messages from `error.message` in the API response.
