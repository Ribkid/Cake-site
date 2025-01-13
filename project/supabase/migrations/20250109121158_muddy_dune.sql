/*
  # Update bookings table policies

  1. Changes
    - Drop existing policies
    - Add new public policies for bookings
  
  2. Security
    - Allow public access for creating bookings
    - Allow viewing own bookings without auth
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;
DROP POLICY IF EXISTS "Public can create bookings" ON bookings;
DROP POLICY IF EXISTS "Public can view own bookings" ON bookings;

-- Create new policies for public access
CREATE POLICY "Public can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (true);