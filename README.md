# Joobees

Joobees is a remote-first job board and profile platform built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features
- BFF-powered homepage and search
- Dashboard shell with overview and profile editing
- Public profile pages (`/@username`)
- Auth feature with modal sign-in
- Modular, feature-based frontend architecture

## Requirements
- Node.js 18+
- npm 9+

## Setup
```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run start` — start production server

## Architecture Notes
- UI talks only to BFF endpoints (`/api/*`)
- All profile editing uses partial PATCH updates
- Feature modules encapsulate UI behavior

## Repository
Remember to add your remote:
```bash
git remote add origin <YOUR_REPO_URL>
git push -u origin master
```
