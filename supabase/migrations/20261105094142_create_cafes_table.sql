/*
# Create cafes directory table

1. New Tables
- `cafes`: a public directory of coffee shops.
  - `id` (uuid, primary key)
  - `name` (text) display name of the cafe
  - `neighborhood` (text) area of the city
  - `address` (text) street address
  - `description` (text) short blurb shown on cards and details
  - `image_url` (text) photo of the cafe
  - `rating` (numeric 0 to 5) average rating
  - `price_level` (smallint 1 to 4) relative price
  - `has_wifi`, `has_outlets`, `is_pet_friendly`, `serves_vegan` (boolean) amenities
  - `open_until` (text) closing time label
  - `created_at` (timestamp)

2. Security
- Enable RLS on `cafes`.
- Grant SELECT only to `anon` and `authenticated`, since the app has no sign-in and the directory is intentionally public.
- Read-only policy for anon and authenticated; no write access is granted to the browser.

3. Notes
- No user data is stored in this table.
- Statements are idempotent so the migration can be safely re-run.
*/

CREATE TABLE IF NOT EXISTS cafes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  neighborhood text NOT NULL,
  address text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  rating numeric(2,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  price_level smallint NOT NULL DEFAULT 2 CHECK (price_level BETWEEN 1 AND 4),
  has_wifi boolean NOT NULL DEFAULT false,
  has_outlets boolean NOT NULL DEFAULT false,
  is_pet_friendly boolean NOT NULL DEFAULT false,
  serves_vegan boolean NOT NULL DEFAULT false,
  open_until text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cafes ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON cafes TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_cafes" ON cafes;
CREATE POLICY "anon_select_cafes" ON cafes FOR SELECT
  TO anon, authenticated USING (true);
