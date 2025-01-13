/*
  # Update delete policy for admin users

  1. Changes
    - Drop existing delete policy
    - Create new policy with broader admin access
    
  2. Security
    - Only authenticated admin users can delete bookings
    - Admin is identified by email 'Ltevilboy@admin.com'
*/

-- Drop existing delete policy if it exists
DROP POLICY IF EXISTS "Admin users can delete bookings" ON bookings;

-- Create new delete policy with broader access
CREATE POLICY "Admin users can delete bookings"
  ON bookings
  FOR DELETE
  USING (
    auth.jwt() ->> 'email' = 'Ltevilboy@admin.com'
  );