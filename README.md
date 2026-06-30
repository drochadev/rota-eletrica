# RotaElétrica ⚡

GPS navigation app designed for electric tricycles. Real-time tracking, battery range prediction by incline, smooth auto-follow camera, and offline routing.

---

## The Problem

Electric tricycle riders need navigation that understands their vehicle. Standard GPS apps don't account for limited battery range, speed differences, or road types that matter for light electric vehicles. When you're on a 35km range, knowing whether a hill will drain your battery before you get home is the difference between arriving and pushing.

## What I Built

A full-featured GPS nav app specifically for electric tricycles:

- **Real-time GPS tracking** with smooth camera follow (no jerky map updates)
- **Battery range model** that accounts for incline — hills drain faster, descents regenerate
- **Offline routing** using OpenStreetMap data — works without internet
- **Home & favorites** — save frequent destinations in-browser (IndexedDB)
- **Trip history** with odometer tracking
- **Auto-reroute** when you deviate from the planned path
- **Bearing lock** — the map only flips direction when you actually turn, not on GPS noise

## Tech Stack

- **MapLibre GL** — open-source map rendering (free, no API key needed)
- **OpenStreetMap** — routing data and geocoding via Nominatim
- **Python** — graph building and route computation
- **IndexedDB** — client-side storage (home, favorites, trip history, odometer)
- **Cloudflare Pages** — deployment

## Live Demo

[https://rota-eletrica.pages.dev](https://rota-eletrica.pages.dev)

## How to Run Locally

1. Clone the repo
2. Serve the `public/` folder with any HTTP server:
   ```
   python3 -m http.server 8080 -d public
   ```
3. Open `http://localhost:8080` in a browser

Routing uses the free [OSRM](https://project-osrm.org/) demo server (online). Geocoding uses [Nominatim](https://nominatim.openstreetmap.org/) (free, no API key).

## Data Attribution

Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). Map tiles by [CARTO](https://carto.com/basemaps).
