# Supabase Admin CMS Setup

This project now includes an admin panel at `/admin` for managing images, pricing, services, team, testimonials, and contact content.

## 1) Create a Supabase project

Create a new project at [https://supabase.com](https://supabase.com).

## 2) Add environment variables

Copy `.env.example` to `.env` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 3) Create database tables

Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  booking_date date not null,
  booking_time text not null,
  created_at timestamptz default now()
);
```

## 4) Create storage bucket

In Storage, create a public bucket named:

- `site-images`

## 5) Enable auth for admins

Use Supabase Auth (Email/Password) and create an admin user in Authentication.

## 6) Apply simple policies

Use these starter policies (tighten later for production):

```sql
alter table public.site_content enable row level security;
alter table public.bookings enable row level security;

create policy "read site content"
on public.site_content for select
to anon, authenticated
using (true);

create policy "admins write site content"
on public.site_content for all
to authenticated
using (true)
with check (true);

create policy "create bookings"
on public.bookings for insert
to anon, authenticated
with check (true);

create policy "admins read bookings"
on public.bookings for select
to authenticated
using (true);
```

For bucket access, allow:
- public read on `site-images`
- authenticated upload

## 7) Seed initial content

Open `/admin`, sign in, and save once. The app will upsert the full content JSON into `site_content`.

## 8) Hosting

Works on static hosting (Vercel, Netlify, cPanel static, etc.) because data/API is handled by Supabase.
