/*
  # Final Admin Authentication Fix

  1. Changes
    - Drop and recreate admin_users table with proper structure
    - Create admin user with proper permissions
    - Update RLS policies
*/

-- Drop existing table and recreate with proper structure
DROP TABLE IF EXISTS admin_users CASCADE;
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_admin boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users table
DROP POLICY IF EXISTS "Admin can read admin_users" ON admin_users;
CREATE POLICY "Admin can read admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for all operations on bookings
DROP POLICY IF EXISTS "Admin can manage bookings" ON bookings;
CREATE POLICY "Admin can manage bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND is_admin = true
    )
  );

-- Insert admin user directly
INSERT INTO admin_users (email, is_admin)
VALUES ('Ltevilboy@admin.com', true)
ON CONFLICT (email) 
DO UPDATE SET is_admin = true;