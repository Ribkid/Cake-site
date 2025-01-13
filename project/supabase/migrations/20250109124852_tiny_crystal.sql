/*
  # Create Admin User and Policies

  1. Changes
    - Add admin role to auth.users
    - Create policy for admin access to bookings
*/

-- Create policy for admin access to all bookings
CREATE POLICY "Admin users can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'Ltevilboy@admin.com'
  );

-- Note: The admin user needs to be created through the Supabase dashboard or API
-- as we cannot directly create auth users in migrations.
-- Please create a user with:
-- Email: Ltevilboy@admin.com
-- Password: Liamribs1