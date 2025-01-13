/*
  # Create bookings system tables

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_email` (text, not null)
      - `user_name` (text, not null)
      - `service_type` (text, not null)
      - `booking_date` (timestamptz, not null)
      - `status` (text, not null) - 'pending', 'confirmed', 'cancelled'
      - `square_payment_id` (text)
      - `deposit_paid` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
  2. Security
    - Enable RLS on `bookings` table
    - Add policies for users to read their own bookings
    - Add policy for creating new bookings
*/

CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  user_name text NOT NULL,
  service_type text NOT NULL,
  booking_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  square_payment_id text,
  deposit_paid boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  USING (user_email = auth.jwt()->>'email');

-- Allow users to create bookings
CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();