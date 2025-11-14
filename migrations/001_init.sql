-- Migration: create reports and users tables for Vías del Chocó

CREATE TABLE IF NOT EXISTS users (
  name TEXT PRIMARY KEY,
  email TEXT,
  blocked BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  title TEXT,
  road INTEGER,
  location TEXT,
  message TEXT,
  "user" TEXT,
  "time" TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  approved BOOLEAN DEFAULT FALSE,
  status TEXT,
  files JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
