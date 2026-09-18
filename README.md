# Zvi Aharon Art — Next.js / Tailwind / Mongoose

A dark editorial artist portfolio based on the approved visual direction.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS v4
- `next/image` (AVIF/WebP delivery handled by Next)
- localStorage overrides for the current no-database phase
- MongoDB + Mongoose model/API already included for the next phase

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Temporary localStorage content mode
The application server-renders the included seed paintings for SEO/performance. On the browser, `/admin` can save JSON overrides to localStorage under:

`zvi-aharon-paintings-v1`

Image records use URLs such as `/artworks/birth-of-the-phoenix.jpg`.

## MongoDB later
1. Copy `.env.example` to `.env.local`.
2. Set `MONGODB_URI`.
3. Set `PAINTING_DATA_SOURCE=mongodb`.
4. Use the included `/api/paintings` and `/api/paintings/[slug]` routes.

For a production CMS/admin, replace the temporary `/admin` localStorage editor with authenticated server mutations.

## Artwork mockups
`RoomViewer` uses four reusable background templates (Living Room / Bedroom / Office / Gallery) and overlays the active artwork dynamically. Add future paintings only to data/Mongo; the same mockup templates work automatically.

## Important
The room mockups are visualization/context tools. The physical dimensions shown in artwork metadata are authoritative.
