# Supabase Database Migration Script
# 
# This script contains the SQL to set up your database schema.
# You can run this in the Supabase SQL Editor or via the Supabase CLI.

## Step 1: Apply the Migration

You have several options to apply this migration:

### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/mwfwnjztrqseoqzoycsc
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/20240813000001_initial_schema.sql`
4. Run the query

### Option B: Using Supabase CLI (if you have it installed)
```bash
# Initialize Supabase in your project
supabase init

# Link to your remote project
supabase link --project-ref mwfwnjztrqseoqzoycsc

# Push migrations to remote database
supabase db push

# Or apply the specific migration
supabase migration up --include-all
```

### Option C: Direct SQL Execution
If you have direct access to your database, you can run the SQL file directly.

## Step 2: Verify the Migration

After applying the migration, verify that all tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

You should see:
- areas
- contacts  
- guard_levels
- news
- quotes
- users

## Step 3: Update Your Service Role Key

Don't forget to update your `.env.local` file with your Service Role Key:
1. Go to Settings -> API in your Supabase dashboard
2. Copy the `service_role` key (not the anon key)
3. Update `SUPABASE_SERVICE_ROLE` in your `.env.local` file

## Step 4: Test the Connection

Run your Next.js application and test the quote functionality:

```bash
npm run dev
```

Visit:
- http://localhost:3000/quote/business
- http://localhost:3000/quote/personal

## Database Schema Overview

The migration creates:

1. **users** - User profiles (extends Supabase auth.users)
2. **guard_levels** - Different security service levels with hourly rates
3. **areas** - Geographic areas with risk multipliers
4. **quotes** - Quote requests and calculations
5. **news** - News articles for the landing page
6. **contacts** - Contact form submissions

All tables include:
- Row Level Security (RLS) policies
- Automatic updated_at timestamps
- Proper indexes for performance
- Sample data for guard_levels and areas

## Sample Data Included

### Guard Levels:
- Basic: R45.00/hour
- Armed: R65.00/hour  
- Supervisor: R75.00/hour
- Premium: R90.00/hour

### Areas (with risk multipliers):
- Johannesburg CBD: 1.2x
- Sandton: 1.0x
- Cape Town CBD: 1.1x
- And more...
