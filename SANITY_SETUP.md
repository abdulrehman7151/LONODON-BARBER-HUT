# Sanity CMS setup

Your Vite app reads published content via `@sanity/client` using **`VITE_`** variables.  
Sanity Studio (the admin UI) reads **`SANITY_STUDIO_`** variables from `.env`.

## 1. Create a Sanity project

1. Sign in at [sanity.io](https://www.sanity.io/manage) and create a project + dataset (`production` is typical).
2. Note the **project ID**.

## 2. Environment variables

Create a `.env` in the project root (never commit secrets you don’t want public — the anon dataset is normally public read):

```env
# Vite frontend (public in built JS)
VITE_SANITY_PROJECT_ID=yourProjectId
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Sanity Studio CLI (npm run studio)
SANITY_STUDIO_PROJECT_ID=yourProjectId
SANITY_STUDIO_DATASET=production
```

## 3. CORS / hosts

In [Sanity manage → API → CORS origins](https://www.sanity.io/manage), add:

- `http://localhost:5173` (Vite dev)
- Your production URL (e.g. `https://yourdomain.com`)

## 4. Run the studio (client editing)

```bash
npm run studio
```

Open the URL shown in the terminal. Create/edit:

| Desk section   | Creates / edits                    |
|----------------|------------------------------------|
| Homepage       | Document id **`homepage`**         |
| Photo gallery   | Document id **`gallery`**         |
| Services       | One document per service           |
| Team           | One document per barber           |
| Testimonials   | One document per review           |

### First-time singletons

1. Open **Homepage** — publish the document (id is fixed as `homepage`).
2. Open **Photo gallery** — add images, publish (id is fixed as `gallery`).

## 5. Build & deploy frontend

Same as usual:

```bash
npm run build
```

Host the `dist` folder on Netlify / Vercel / any static host. Content is fetched live from Sanity’s CDN when `useCdn` is enabled in production.

## 6. Typical production checklist

- [ ] Dataset **public** reads are OK for a marketing site (`useCdn: true`).
- [ ] Editors use **Studio** with Sanity accounts (not anon key write).
- [ ] Images use Sanity CDN automatically via `@sanity/image-url`.
