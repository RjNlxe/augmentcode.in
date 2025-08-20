-- Alternative approach: Create separate guest_hearts table
-- This avoids modifying the existing hearts table

CREATE TABLE IF NOT EXISTS guest_hearts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id TEXT NOT NULL,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one heart per guest per project
  UNIQUE(guest_id, project_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_guest_hearts_guest_id ON guest_hearts(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_hearts_project_id ON guest_hearts(project_id);
CREATE INDEX IF NOT EXISTS idx_guest_hearts_guest_project ON guest_hearts(guest_id, project_id);

-- Enable RLS
ALTER TABLE guest_hearts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for guest_hearts
CREATE POLICY "Guest hearts are viewable by everyone" ON guest_hearts
  FOR SELECT USING (true);

CREATE POLICY "Anyone can manage guest hearts" ON guest_hearts
  FOR ALL USING (true);

-- Grant permissions
GRANT SELECT, INSERT, DELETE ON guest_hearts TO anon;
GRANT SELECT, INSERT, DELETE ON guest_hearts TO authenticated;

-- Create a view that combines user hearts and guest hearts for easy counting
CREATE OR REPLACE VIEW all_hearts AS
SELECT 
  project_id,
  'user' as heart_type,
  user_id as identifier,
  created_at
FROM hearts
WHERE user_id IS NOT NULL

UNION ALL

SELECT 
  project_id,
  'guest' as heart_type,
  guest_id as identifier,
  created_at
FROM guest_hearts;

-- Grant permissions on the view
GRANT SELECT ON all_hearts TO anon;
GRANT SELECT ON all_hearts TO authenticated;
