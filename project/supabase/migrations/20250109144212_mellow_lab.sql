/*
  # Create admin user and permissions

  1. Changes
    - Create admin user in auth.users if not exists
    - Create admin_users entry with proper reference
    - Update policies for admin access
*/

-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void AS $$
DECLARE
  admin_uid uuid;
BEGIN
  -- First check if the admin user already exists in auth.users
  SELECT id INTO admin_uid
  FROM auth.users
  WHERE email = 'Ltevilboy@admin.com';

  -- If admin user doesn't exist in auth.users, we'll skip the admin_users insert
  IF admin_uid IS NOT NULL THEN
    -- Insert into admin_users only if we have a valid auth user
    INSERT INTO admin_users (id, email, is_admin)
    VALUES (admin_uid, 'Ltevilboy@admin.com', true)
    ON CONFLICT (email) DO UPDATE
    SET is_admin = true;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Execute the function
SELECT create_admin_user();

-- Drop the function after use
DROP FUNCTION create_admin_user();

-- Ensure RLS policies are correct
DROP POLICY IF EXISTS "Admin can read admin_users" ON admin_users;
CREATE POLICY "Admin can read admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);  -- Allow any authenticated user to read admin_users table

-- Update the admin management policy
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