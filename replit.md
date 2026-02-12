# RazaTv - Live TV Streaming Application

## Overview

RazaTv is a client-side web application for streaming live TV channels via M3U8/HLS (HTTP Live Streaming) links. Users can either browse a grid of predefined TV channels or paste a custom M3U8 stream URL to watch content in a built-in video player. The app is primarily targeted at Pakistani TV channels (news and entertainment) and has a dark-themed, Netflix-inspired UI.

This is a **static frontend-only application** — there is no backend server, no database, and no authentication. All state is managed via `localStorage` and URL hash fragments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure HTML/CSS/JavaScript** — no frontend framework (React, Vue, etc.) is used.
- **jQuery** (v3.2.1, loaded via CDN) is used for DOM manipulation and form handling.
- **HLS.js** (loaded via CDN) handles M3U8 video stream playback in browsers that don't natively support HLS.
- **Mousetrap.js** (bundled locally as `player/mousetrap.min.js`) provides keyboard shortcut bindings for the video player.

### Page Structure
- **`index.html`** — Main landing page with a channel grid UI. Has a dark theme with CSS custom properties. Includes a custom cursor implementation and fixed header.
- **`player/index.html`** — Dedicated video player page. Receives the M3U8 URL via the URL hash fragment (`#`). Renders a full-screen video element.
- **`main.js`** — Handles the form submission on the landing page. Saves the M3U8 link to `localStorage` and redirects to the player page with the URL in the hash.
- **`player/player.js`** — Core video player logic. Uses HLS.js for stream playback with fallback to native HLS support (Safari/iOS). Includes utility functions for play/pause, volume control, seeking, mute toggle, and fullscreen.
- **`home.css`** — Additional styles for the landing page with responsive grid layout.
- **`rawlink.txt`** — A collection of raw M3U8 stream URLs for various Pakistani TV channels (KTN, ARY News, Geo News, Express News, etc.). This serves as a reference/data source for channel links.

### Data Flow
1. User selects a channel or pastes an M3U8 URL on the landing page.
2. The URL is saved to `localStorage` and appended as a hash fragment to the player page URL.
3. The player page reads the hash, initializes HLS.js, and begins streaming.

### Video Playback Strategy
- **Primary**: HLS.js library for browsers with MediaSource Extensions support (Chrome, Firefox, Edge).
- **Fallback**: Native HLS support via `<video>` element's `src` attribute (Safari, iOS).
- Default volume is set to 0.3 (30%).

### Key Design Decisions
- **No backend/server**: Everything runs client-side. Stream URLs are either hardcoded or user-provided. This keeps deployment simple but means no server-side proxy for CORS issues.
- **URL hash for state**: The M3U8 URL is passed to the player via the URL hash (`window.location.hash`), avoiding the need for server-side routing or query parameters.
- **localStorage persistence**: The last-used M3U8 link is remembered across sessions.
- **Custom cursor**: The main page implements a custom SVG cursor for aesthetic purposes, hidden during fullscreen mode.

## External Dependencies

### CDN Libraries
- **jQuery 3.2.1** — `https://code.jquery.com/jquery-3.2.1.min.js` — DOM manipulation
- **HLS.js (latest)** — `https://cdn.jsdelivr.net/npm/hls.js@latest` — M3U8/HLS stream playback

### Bundled Libraries
- **Mousetrap v1.6.1** — `player/mousetrap.min.js` — Keyboard shortcut handling for video controls

### External Stream Sources
- M3U8 streams are sourced from `tamashaweb.com` CDN servers (various endpoints like `cdn12isb`, `cdn07lhr`, `cdn22lhr`, etc.)
- A GitHub-hosted M3U playlist is referenced: `https://raw.githubusercontent.com/hyder1848/Jazz-tv-free/main/Jamalitv_updated_120.m3u`

### No Database
- No database is used. All persistence is via browser `localStorage`.

### No Authentication
- No user authentication or authorization system exists.