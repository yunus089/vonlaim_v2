CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Webdesign',
  tags TEXT NOT NULL DEFAULT '',
  featured_image TEXT NOT NULL DEFAULT '',
  featured_image_alt TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  eyebrow TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 100,
  seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL DEFAULT '',
  industry TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  challenge TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '',
  result TEXT NOT NULL DEFAULT '',
  featured_image TEXT NOT NULL DEFAULT '',
  featured_image_alt TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 100,
  seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Allgemein',
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  eyebrow TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  cta_label TEXT NOT NULL DEFAULT '',
  cta_href TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'published',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  service_interest TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS posts_status_published_idx ON posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS services_status_sort_idx ON services(status, sort_order ASC);
CREATE INDEX IF NOT EXISTS projects_status_sort_idx ON projects(status, sort_order ASC);
CREATE INDEX IF NOT EXISTS faqs_status_sort_idx ON faqs(status, sort_order ASC);
CREATE INDEX IF NOT EXISTS testimonials_status_sort_idx ON testimonials(status, sort_order ASC);
CREATE INDEX IF NOT EXISTS leads_created_idx ON leads(created_at DESC);
