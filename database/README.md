# AI FAQ Lead Capture Bot - Database Setup Guide

## Phase 1: Security Foundation & Database Schema

This guide will help you set up the multi-tenant database schema and security policies for your AI FAQ application.

## Prerequisites

- Supabase project created
- Access to Supabase Dashboard
- Database URL and API keys configured in your `.env` file
- **pgvector extension enabled** (for semantic search functionality)

### Installing pgvector (Required for AI Features)

The schema uses the `pgvector` extension for vector embeddings. You need to enable this in your Supabase project:

1. Go to your Supabase Dashboard
2. Navigate to **Database > Extensions**
3. Search for "vector" and enable the `pgvector` extension
4. Alternatively, you can run this SQL command in the SQL Editor:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "vector";
   ```

**Note:** If you don't need AI semantic search features, you can comment out or remove the `embedding_vector` column from the `knowledge_base` table in the schema.

## Step 1: Enable Email Confirmation

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication > Settings**
4. Under **Email Confirmation**, toggle **Enable email confirmations** to ON
5. Configure the email templates if desired
6. Save changes

## Step 2: Enable Google Authentication

1. In your Supabase Dashboard, go to **Authentication > Providers**
2. Find **Google** and click to enable it
3. You'll need to create OAuth credentials in Google Cloud Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google+ API
   - Go to **Credentials > Create Credentials > OAuth 2.0 Client IDs**
   - Set Application type to **Web application**
   - Add authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
   - Copy the Client ID and Client Secret
4. Back in Supabase, paste the Client ID and Client Secret
5. Add your domain to authorized domains if needed
6. Save changes

## Step 3: Set Up Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Copy and paste the entire contents of `database/schema.sql`
3. Click **Run** to execute the SQL script

**If you get "relation already exists" errors:**

1. Run the cleanup script first: `database/cleanup.sql`
2. Then re-run the main schema: `database/schema.sql`

This will create:

- All necessary tables (tenants, profiles, conversations, etc.)
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers and functions for automatic user setup
- **Vector embeddings support** (if pgvector is enabled)

## Step 4: Enable Vector Search (Optional but Recommended)

For AI-powered semantic search in your knowledge base:

1. In Supabase Dashboard, go to **Database > Extensions**
2. Enable the `pgvector` extension
3. The schema will automatically add the `embedding_vector` column to the `knowledge_base` table

**Benefits of vector search:**

- Semantic search capabilities
- Better AI responses based on document similarity
- Enhanced knowledge base queries

**Note:** If you skip this step, the knowledge base will still work with traditional text search.

## Step 4: Verify Setup

After running the schema, verify that:

1. **Tables Created**: Check that all tables exist in **Database > Tables**
2. **RLS Enabled**: Each table should show "RLS enabled" in the table details
3. **Policies Applied**: Check the **Auth > Policies** section to see the RLS policies
4. **Authentication Works**: Test user registration and login

## Database Schema Overview

### Core Tables

- **`tenants`**: Organizations/companies using the platform
- **`profiles`**: Extended user information
- **`tenant_users`**: Links users to tenants with roles
- **`conversations`**: Chat sessions with the AI bot
- **`messages`**: Individual messages in conversations
- **`knowledge_base`**: Documents and articles for AI training
- **`faqs`**: Frequently asked questions
- **`api_keys`**: API keys for integrations
- **`channels`**: Integration channels (Slack, Discord, etc.)
- **`analytics`**: Usage analytics and events

### Security Model

The application uses **Row Level Security (RLS)** to ensure multi-tenancy:

- Users can only access data belonging to their tenant
- Tenant owners and admins have elevated permissions
- All data access is filtered by `tenant_id`

### Key Security Policies

1. **Tenant Isolation**: Users can only see data from tenants they belong to
2. **Role-Based Access**: Different permissions for owners, admins, and members
3. **Profile Privacy**: Users can only access their own profile data
4. **API Key Security**: Only admins can manage API keys

## Testing the Setup

1. **Register a new user** through your app
2. **Check the database** to see if:

   - A new profile was created in `profiles`
   - A new tenant was created in `tenants`
   - The user was added to `tenant_users` with 'owner' role

3. **Test Google OAuth** by clicking the "Continue with Google" button

4. **Verify RLS** by logging in as different users and confirming they can't access each other's data

## Next Steps

After completing this setup:

1. **Create API routes** for CRUD operations on the tables
2. **Implement tenant switching** (if supporting multiple tenants per user)
3. **Add billing/subscription logic** using the `subscription_plan` and `subscription_status` fields
4. **Set up monitoring** for the analytics table

## Troubleshooting

### Common Issues

1. **"relation already exists" error**: If tables already exist from a previous run:

   - Run `database/cleanup.sql` first to drop existing tables
   - Then re-run `database/schema.sql`

2. **VECTOR type error**: If you see "type 'vector' does not exist", enable the pgvector extension:

   - Go to **Database > Extensions** in Supabase Dashboard
   - Search for "vector" and enable it
   - Re-run the schema SQL

3. **RLS Blocking Queries**: If you're getting permission errors, check that RLS policies are correctly applied

4. **Trigger Not Firing**: Ensure the `handle_new_user` function is working by checking the `tenant_users` table after signup

5. **Google OAuth Not Working**: Double-check the redirect URI and client credentials in Google Cloud Console

### Useful SQL Queries for Debugging

```sql
-- Check RLS policies
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- View current user and tenant
SELECT
    auth.uid() as current_user,
    p.full_name,
    t.name as tenant_name,
    tu.role
FROM profiles p
LEFT JOIN tenant_users tu ON p.id = tu.user_id
LEFT JOIN tenants t ON tu.tenant_id = t.id
WHERE p.id = auth.uid();
```

## Security Notes

- All tables have RLS enabled
- Sensitive data (API keys) are hashed
- User data is properly isolated by tenant
- Authentication is handled by Supabase Auth
- All database operations should go through your API layer (never direct client access)

Remember to regularly review and update your RLS policies as your application evolves!
