/*
  # Fix delete policy for admin users

  1. Changes
    - Drop existing delete policy
    - Create new delete policy with proper permissions for admin user
    - Add update policy for admin user

  2. Security
    - Ensures admin can delete and update bookings
    - Maintains existing RLS policies
*/

-- Drop existing delete policy if it exists
DROP POLICY IF EXISTS "Admin users can delete bookings" ON bookings;

-- Create new delete policy
CREATE POLICY "Admin users can delete bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'Ltevilboy@admin.com');

-- Create update policy for admin
CREATE POLICY "Admin users can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'Ltevilboy@admin.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'Ltevilboy@admin.com');