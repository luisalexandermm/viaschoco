-- Add password column for users table (if missing)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS password TEXT;
