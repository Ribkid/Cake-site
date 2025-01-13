/*
  # Add message column to bookings table

  1. Changes
    - Add `message` column to store additional notes from bookings
    
  2. Security
    - No changes to existing policies
*/

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS message text;