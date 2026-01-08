-- -- =========================================
-- -- HelplyAI - Full Multi-Tenant Database Schema
-- -- =========================================

-- BEGIN;

-- -- =========================================
-- -- 0. CLEANUP (Optional - Uncomment if needed)
-- -- DROP TABLE IF EXISTS analytics, channels, api_keys, faqs, knowledge_base, messages, conversations, tenant_users, profiles, tenants CASCADE;

-- -- =========================================
-- -- 1. EXTENSIONS
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- CREATE EXTENSION IF NOT EXISTS "vector"; -- For AI Knowledge Base embeddings

-- -- =========================================
-- -- 2. TABLES

-- -- TENANTS
-- CREATE TABLE IF NOT EXISTS tenants (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     name VARCHAR(255) NOT NULL,
--     domain VARCHAR(255) UNIQUE,
--     subdomain VARCHAR(100) UNIQUE,
--     logo_url TEXT,
--     primary_color VARCHAR(7),
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     is_active BOOLEAN DEFAULT true,
--     subscription_plan VARCHAR(50) DEFAULT 'free',
--     subscription_status VARCHAR(20) DEFAULT 'active'
-- );

-- -- PROFILES
-- CREATE TABLE IF NOT EXISTS profiles (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id UUID NOT NULL UNIQUE, -- Reference to auth.users(id) - enforced by RLS
--     full_name TEXT,
--     avatar_url TEXT,
--     phone TEXT,
--     company TEXT,
--     job_title TEXT,
--     timezone TEXT DEFAULT 'UTC',
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- TENANT_USERS
-- CREATE TABLE IF NOT EXISTS tenant_users (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id UUID NOT NULL, -- Reference to auth.users(id) - enforced by RLS
--     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
--     role VARCHAR(50) DEFAULT 'member',
--     invited_by UUID, -- Reference to auth.users(id) - enforced by RLS
--     invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     joined_at TIMESTAMP WITH TIME ZONE,
--     is_active BOOLEAN DEFAULT true,
--     UNIQUE(user_id, tenant_id)
-- );

-- -- CONVERSATIONS
-- CREATE TABLE IF NOT EXISTS conversations (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
--     user_id UUID, -- Reference to auth.users(id) - enforced by RLS
--     session_id VARCHAR(255),
--     title TEXT,
--     status VARCHAR(20) DEFAULT 'active',
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- MESSAGES
-- CREATE TABLE IF NOT EXISTS messages (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
--     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
--     user_id UUID, -- Reference to auth.users(id) - enforced by RLS
--     content TEXT NOT NULL,
--     message_type VARCHAR(20) DEFAULT 'text',
--     sender_type VARCHAR(10) NOT NULL,
--     metadata JSONB DEFAULT '{}',
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- KNOWLEDGE_BASE
-- CREATE TABLE IF NOT EXISTS knowledge_base (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
--     title TEXT NOT NULL,
--     content TEXT,
--     category VARCHAR(100),
--     tags TEXT[],
--     source_url TEXT,
--     file_path TEXT,
--     file_type VARCHAR(50),
--     created_by UUID, -- Reference to auth.users(id) - enforced by RLS
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     is_active BOOLEAN DEFAULT true
-- );

-- -- FAQS
-- CREATE TABLE IF NOT EXISTS faqs (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
--     question TEXT NOT NULL,
--     answer TEXT NOT NULL,
--     category VARCHAR(100),
--     tags TEXT[],
--     view_count INTEGER DEFAULT 0,
--     helpful_count INTEGER DEFAULT 0,
--     created_by UUID, -- Reference to auth.users(id) - enforced by RLS
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     is_active BOOLEAN DEFAULT true
-- );

-- -- API_KEYS
-- CREATE TABLE IF NOT EXISTS api_keys (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     key_hash TEXT NOT NULL,
--     permissions JSONB DEFAULT '[]',
--     created_by UUID, -- Reference to auth.users(id) - enforced by RLS
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     expires_at TIMESTAMP WITH TIME ZONE,
--     is_active BOOLEAN DEFAULT true
-- );

-- -- CHANNELS
-- CREATE TABLE IF NOT EXISTS channels (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
--     type VARCHAR(50) NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     config JSONB DEFAULT '{}',
--     webhook_url TEXT,
--     is_active BOOLEAN DEFAULT true,
--     created_by UUID, -- Reference to auth.users(id) - enforced by RLS
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- ANALYTICS
-- CREATE TABLE IF NOT EXISTS analytics (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
--     event_type VARCHAR(100) NOT NULL,
--     event_data JSONB DEFAULT '{}',
--     user_id UUID, -- Reference to auth.users(id) - enforced by RLS
--     session_id VARCHAR(255),
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- =========================================
-- -- 3. INDEXES
-- CREATE INDEX IF NOT EXISTS idx_tenant_users_user_id ON tenant_users(user_id);
-- CREATE INDEX IF NOT EXISTS idx_tenant_users_tenant_id ON tenant_users(tenant_id);
-- CREATE INDEX IF NOT EXISTS idx_conversations_tenant_id ON conversations(tenant_id);
-- CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
-- CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
-- CREATE INDEX IF NOT EXISTS idx_messages_tenant_id ON messages(tenant_id);
-- CREATE INDEX IF NOT EXISTS idx_knowledge_base_tenant_id ON knowledge_base(tenant_id);
-- CREATE INDEX IF NOT EXISTS idx_faqs_tenant_id ON faqs(tenant_id);
-- CREATE INDEX IF NOT EXISTS idx_api_keys_tenant_id ON api_keys(tenant_id);
-- CREATE INDEX IF NOT EXISTS idx_channels_tenant_id ON channels(tenant_id);
-- CREATE INDEX IF NOT EXISTS idx_analytics_tenant_id ON analytics(tenant_id);
-- CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);

-- -- =========================================
-- -- CONDITIONAL VECTOR COLUMN (if pgvector is available)
-- -- =========================================

-- -- Add vector column for semantic search if pgvector extension is available
-- DO $$
-- BEGIN
--     IF EXISTS (
--         SELECT 1 FROM pg_extension WHERE extname = 'vector'
--     ) THEN
--         -- Add the embedding_vector column if it doesn't exist
--         IF NOT EXISTS (
--             SELECT 1 FROM information_schema.columns
--             WHERE table_name = 'knowledge_base' AND column_name = 'embedding_vector'
--         ) THEN
--             ALTER TABLE knowledge_base ADD COLUMN embedding_vector VECTOR(1536);
--         END IF;
--     END IF;
-- END $$;

-- -- =========================================
-- -- 4. ENABLE RLS
-- ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tenant_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- -- =========================================
-- -- 5. ROW LEVEL SECURITY POLICIES
-- -- =========================================

-- -- Helper function to get user's tenant IDs
-- CREATE OR REPLACE FUNCTION auth.get_user_tenant_ids()
-- RETURNS UUID[] AS $$
-- BEGIN
--     RETURN ARRAY(
--         SELECT tenant_id
--         FROM tenant_users
--         WHERE user_id = auth.uid() AND is_active = true
--     );
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- -- TENANTS POLICIES
-- DO $$
-- BEGIN
--     -- Users can view tenants they belong to
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their tenants' AND tablename = 'tenants') THEN
--         CREATE POLICY "Users can view their tenants" ON tenants FOR SELECT
--         USING (id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Users can update tenants they belong to (if they have admin role)
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their tenants' AND tablename = 'tenants') THEN
--         CREATE POLICY "Users can update their tenants" ON tenants FOR UPDATE
--         USING (
--             id = ANY(auth.get_user_tenant_ids()) AND
--             EXISTS (
--                 SELECT 1 FROM tenant_users
--                 WHERE tenant_id = tenants.id AND user_id = auth.uid() AND role IN ('admin', 'owner')
--             )
--         );
--     END IF;
-- END $$;

-- -- PROFILES POLICIES
-- DO $$
-- BEGIN
--     -- Users can view their own profile
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own profile' AND tablename = 'profiles') THEN
--         CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
--     END IF;

--     -- Users can update their own profile
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own profile' AND tablename = 'profiles') THEN
--         CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
--     END IF;

--     -- Users can insert their own profile
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own profile' AND tablename = 'profiles') THEN
--         CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
--     END IF;
-- END $$;

-- -- TENANT_USERS POLICIES
-- DO $$
-- BEGIN
--     -- Users can view tenant_users for tenants they belong to
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view tenant members' AND tablename = 'tenant_users') THEN
--         CREATE POLICY "Users can view tenant members" ON tenant_users FOR SELECT
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Admins can manage tenant_users for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage tenant members' AND tablename = 'tenant_users') THEN
--         CREATE POLICY "Admins can manage tenant members" ON tenant_users FOR ALL
--         USING (
--             tenant_id = ANY(auth.get_user_tenant_ids()) AND
--             EXISTS (
--                 SELECT 1 FROM tenant_users tu
--                 WHERE tu.tenant_id = tenant_users.tenant_id AND tu.user_id = auth.uid() AND tu.role IN ('admin', 'owner')
--             )
--         );
--     END IF;
-- END $$;

-- -- CONVERSATIONS POLICIES
-- DO $$
-- BEGIN
--     -- Users can view conversations for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view tenant conversations' AND tablename = 'conversations') THEN
--         CREATE POLICY "Users can view tenant conversations" ON conversations FOR SELECT
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Users can create conversations for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create tenant conversations' AND tablename = 'conversations') THEN
--         CREATE POLICY "Users can create tenant conversations" ON conversations FOR INSERT
--         WITH CHECK (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Users can update conversations for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update tenant conversations' AND tablename = 'conversations') THEN
--         CREATE POLICY "Users can update tenant conversations" ON conversations FOR UPDATE
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;
-- END $$;

-- -- MESSAGES POLICIES
-- DO $$
-- BEGIN
--     -- Users can view messages for their tenant conversations
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view tenant messages' AND tablename = 'messages') THEN
--         CREATE POLICY "Users can view tenant messages" ON messages FOR SELECT
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Users can create messages for their tenant conversations
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create tenant messages' AND tablename = 'messages') THEN
--         CREATE POLICY "Users can create tenant messages" ON messages FOR INSERT
--         WITH CHECK (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;
-- END $$;

-- -- KNOWLEDGE_BASE POLICIES
-- DO $$
-- BEGIN
--     -- Users can view knowledge base for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view tenant knowledge base' AND tablename = 'knowledge_base') THEN
--         CREATE POLICY "Users can view tenant knowledge base" ON knowledge_base FOR SELECT
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Users can manage knowledge base for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage tenant knowledge base' AND tablename = 'knowledge_base') THEN
--         CREATE POLICY "Users can manage tenant knowledge base" ON knowledge_base FOR ALL
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;
-- END $$;

-- -- FAQS POLICIES
-- DO $$
-- BEGIN
--     -- Users can view FAQs for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view tenant FAQs' AND tablename = 'faqs') THEN
--         CREATE POLICY "Users can view tenant FAQs" ON faqs FOR SELECT
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Users can manage FAQs for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage tenant FAQs' AND tablename = 'faqs') THEN
--         CREATE POLICY "Users can manage tenant FAQs" ON faqs FOR ALL
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;
-- END $$;

-- -- API_KEYS POLICIES
-- DO $$
-- BEGIN
--     -- Users can view API keys for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view tenant API keys' AND tablename = 'api_keys') THEN
--         CREATE POLICY "Users can view tenant API keys" ON api_keys FOR SELECT
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Admins can manage API keys for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage tenant API keys' AND tablename = 'api_keys') THEN
--         CREATE POLICY "Admins can manage tenant API keys" ON api_keys FOR ALL
--         USING (
--             tenant_id = ANY(auth.get_user_tenant_ids()) AND
--             EXISTS (
--                 SELECT 1 FROM tenant_users tu
--                 WHERE tu.tenant_id = api_keys.tenant_id AND tu.user_id = auth.uid() AND tu.role IN ('admin', 'owner')
--             )
--         );
--     END IF;
-- END $$;

-- -- CHANNELS POLICIES
-- DO $$
-- BEGIN
--     -- Users can view channels for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view tenant channels' AND tablename = 'channels') THEN
--         CREATE POLICY "Users can view tenant channels" ON channels FOR SELECT
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Admins can manage channels for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage tenant channels' AND tablename = 'channels') THEN
--         CREATE POLICY "Admins can manage tenant channels" ON channels FOR ALL
--         USING (
--             tenant_id = ANY(auth.get_user_tenant_ids()) AND
--             EXISTS (
--                 SELECT 1 FROM tenant_users tu
--                 WHERE tu.tenant_id = channels.tenant_id AND tu.user_id = auth.uid() AND tu.role IN ('admin', 'owner')
--             )
--         );
--     END IF;
-- END $$;

-- -- ANALYTICS POLICIES
-- DO $$
-- BEGIN
--     -- Users can view analytics for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view tenant analytics' AND tablename = 'analytics') THEN
--         CREATE POLICY "Users can view tenant analytics" ON analytics FOR SELECT
--         USING (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;

--     -- Users can create analytics events for their tenants
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create tenant analytics' AND tablename = 'analytics') THEN
--         CREATE POLICY "Users can create tenant analytics" ON analytics FOR INSERT
--         WITH CHECK (tenant_id = ANY(auth.get_user_tenant_ids()));
--     END IF;
-- END $$;

-- -- =========================================
-- -- 6. FUNCTIONS (No direct auth triggers - use Supabase dashboard)
-- -- =========================================

-- -- Function to handle new user setup (call this from client after signup)
-- CREATE OR REPLACE FUNCTION public.handle_new_user_setup(user_id UUID, user_email TEXT, user_metadata JSONB DEFAULT '{}')
-- RETURNS VOID AS $$
-- DECLARE
--     tenant_name TEXT;
--     tenant_subdomain TEXT;
-- BEGIN
--     -- Insert profile if it doesn't exist
--     INSERT INTO public.profiles (user_id, full_name)
--     VALUES (user_id, user_metadata->>'full_name')
--     ON CONFLICT (user_id) DO NOTHING;

--     -- Create tenant if it doesn't exist
--     tenant_name := COALESCE(user_metadata->>'company', 'My Organization');
--     tenant_subdomain := LOWER(REPLACE(user_email, '@', '-')) || '-' || substr(md5(random()::text),1,6);

--     INSERT INTO public.tenants (name, subdomain)
--     VALUES (tenant_name, tenant_subdomain)
--     ON CONFLICT (subdomain) DO NOTHING;

--     -- Link user to tenant
--     INSERT INTO public.tenant_users (user_id, tenant_id, role)
--     SELECT user_id, id, 'owner'
--     FROM public.tenants
--     WHERE subdomain = tenant_subdomain
--     ON CONFLICT (user_id, tenant_id) DO NOTHING;

-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- -- Update updated_at timestamps automatically
-- CREATE OR REPLACE FUNCTION public.update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW.updated_at = NOW();
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Attach triggers to tables
-- DO $$
-- DECLARE t text;
-- BEGIN
--     FOR t IN SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename IN
--         ('tenants','profiles','tenant_users','conversations','knowledge_base','faqs','channels','api_keys')
--     LOOP
--         EXECUTE format('DROP TRIGGER IF EXISTS update_%s_updated_at ON %s;', t, t);
--         EXECUTE format('CREATE TRIGGER update_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();', t, t);
--     END LOOP;
-- END $$;

-- -- =========================================
-- -- SETUP INSTRUCTIONS
-- -- =========================================
-- /*
-- To complete the setup in Supabase:

-- 1. Go to Authentication > Hooks in your Supabase dashboard
-- 2. Add a "Post signup" hook that calls: 
--    SELECT public.handle_new_user_setup(auth.uid(), auth.jwt()->>'email', auth.jwt()->>'user_metadata');

-- Or call handle_new_user_setup() from your client application after successful signup:

-- ```javascript
-- // After successful signup in your React app
-- const { data, error } = await supabase.auth.signUp({
--   email: 'user@example.com',
--   password: 'password'
-- });

-- if (data.user) {
--   await supabase.rpc('handle_new_user_setup', {
--     user_id: data.user.id,
--     user_email: data.user.email,
--     user_metadata: data.user.user_metadata
--   });
-- }
-- ```

-- This creates the user's profile, tenant, and tenant_user relationship.
-- */

-- COMMIT;




















-- =========================================
-- HelplyAI - Full Multi-Tenant Database Schema
-- =========================================

BEGIN;

-- =========================================
-- 0. CLEANUP (Optional - Uncomment if needed)
-- DROP TABLE IF EXISTS analytics, channels, api_keys, faqs, knowledge_base, messages, conversations, tenant_users, profiles, tenants CASCADE;

-- =========================================
-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector"; -- For AI Knowledge Base embeddings

-- =========================================
-- 2. TABLES

-- TENANTS
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    subdomain VARCHAR(100) UNIQUE,
    logo_url TEXT,
    primary_color VARCHAR(7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    subscription_plan VARCHAR(50) DEFAULT 'free',
    subscription_status VARCHAR(20) DEFAULT 'active'
);

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    company TEXT,
    job_title TEXT,
    timezone TEXT DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TENANT_USERS
CREATE TABLE IF NOT EXISTS tenant_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member',
    invited_by UUID REFERENCES auth.users(id),
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    joined_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, tenant_id)
);

-- CONVERSATIONS
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id VARCHAR(255),
    title TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text',
    sender_type VARCHAR(10) NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KNOWLEDGE_BASE
CREATE TABLE IF NOT EXISTS knowledge_base (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    category VARCHAR(100),
    tags TEXT[],
    source_url TEXT,
    file_path TEXT,
    file_type VARCHAR(50),
    embedding_vector VECTOR(1536),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- FAQS
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    tags TEXT[],
    view_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- API_KEYS
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    key_hash TEXT NOT NULL,
    permissions JSONB DEFAULT '[]',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- CHANNELS
CREATE TABLE IF NOT EXISTS channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    config JSONB DEFAULT '{}',
    webhook_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ANALYTICS
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT '{}',
    user_id UUID REFERENCES auth.users(id),
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_tenant_users_user_id ON tenant_users(user_id);
CREATE INDEX IF NOT EXISTS idx_tenant_users_tenant_id ON tenant_users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_conversations_tenant_id ON conversations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_tenant_id ON messages(tenant_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_tenant_id ON knowledge_base(tenant_id);
CREATE INDEX IF NOT EXISTS idx_faqs_tenant_id ON faqs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_tenant_id ON api_keys(tenant_id);
CREATE INDEX IF NOT EXISTS idx_channels_tenant_id ON channels(tenant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_tenant_id ON analytics(tenant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);

-- =========================================
-- 4. ENABLE RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- =========================================
-- 5. EXAMPLE POLICIES
-- Profiles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own profile') THEN
        CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
    END IF;
END $$;

-- =========================================
-- 6. TRIGGERS & FUNCTIONS

-- Handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.tenants (name, subdomain)
    VALUES (
        COALESCE(NEW.raw_user_meta_data->>'company', 'My Organization'),
        LOWER(REPLACE(NEW.email, '@', '-')) || '-' || substr(md5(random()::text),1,6)
    )
    ON CONFLICT (subdomain) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamps automatically
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach triggers to tables
DO $$
DECLARE t text;
BEGIN
    FOR t IN SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename IN
        ('tenants','profiles','tenant_users','conversations','knowledge_base','faqs','channels','api_keys')
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS update_%s_updated_at ON %s;', t, t);
        EXECUTE format('CREATE TRIGGER update_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();', t, t);
    END LOOP;
END $$;

COMMIT;
