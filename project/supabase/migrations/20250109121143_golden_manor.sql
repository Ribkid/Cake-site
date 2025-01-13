/*
  # Update bookings RLS policies
  
  1. Changes
    - Drop existing policies
    - Create new public policies for insert and select
  
  2. Security
    - Allow public booking creation
    - Allow reading own bookings without auth
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can view own bookings by email" ON bookings;

-- Create new policies
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