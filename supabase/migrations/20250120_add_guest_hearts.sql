-- Add guest_id column to hearts table to support guest likes
ALTER TABLE hearts 
ADD COLUMN guest_id TEXT;

-- Make user_id nullable since we now support guest hearts
ALTER TABLE hearts 
ALTER COLUMN user_id DROP NOT NULL;

-- Add constraint to ensure either user_id or guest_id is present (but not both)
ALTER TABLE hearts 
ADD CONSTRAINT hearts_user_or_guest_check 
CHECK (
  (user_id IS NOT NULL AND guest_id IS NULL) OR 
  (user_id IS NULL AND guest_id IS NOT NULL)
);

-- Add unique constraint for guest hearts (one heart per guest per project)
ALTER TABLE hearts 
ADD CONSTRAINT hearts_guest_project_unique 
UNIQUE (guest_id, project_id);

-- Update existing constraint name for clarity (if it exists)
-- Note: This might fail if the constraint doesn't exist, which is fine
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'hearts_user_id_project_id_key' 
    AND table_name = 'hearts'
  ) THEN
    ALTER TABLE hearts 
    RENAME CONSTRAINT hearts_user_id_project_id_key 
    TO hearts_user_project_unique;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    -- Ignore errors if constraint doesn't exist
    NULL;
END $$;

-- Create index for better performance on guest_id queries
CREATE INDEX IF NOT EXISTS idx_hearts_guest_id ON hearts(guest_id);
CREATE INDEX IF NOT EXISTS idx_hearts_guest_project ON hearts(guest_id, project_id);

-- Update RLS policies to include guest hearts
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can manage their own hearts" ON hearts;
DROP POLICY IF EXISTS "Hearts are viewable by everyone" ON hearts;

-- Create new policies that support both user and guest hearts
CREATE POLICY "Hearts are viewable by everyone" ON hearts
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own hearts" ON hearts
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Guests can manage their own hearts" ON hearts
  FOR ALL USING (guest_id IS NOT NULL);

-- Grant necessary permissions
GRANT SELECT, INSERT, DELETE ON hearts TO anon;
GRANT SELECT, INSERT, DELETE ON hearts TO authenticated;
