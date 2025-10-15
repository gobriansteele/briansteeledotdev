#!/bin/bash

# Load environment variables from .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Generate Supabase types from remote project
npx supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > src/lib/supabase/database.types.ts

echo "✅ Database types generated successfully!"
