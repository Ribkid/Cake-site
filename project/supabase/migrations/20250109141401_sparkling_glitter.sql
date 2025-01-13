/*
  # Add delete policy for admin users

  1. Changes
    - Add policy to allow admin users to delete bookings
    
  2. Security
    - Only authenticated admin users can delete bookings
    - Admin is identified by email 'Ltevilboy@admin.com'
*/

CREATE POLICY "Admin users can delete bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'Ltevilboy@admin.com'
  );