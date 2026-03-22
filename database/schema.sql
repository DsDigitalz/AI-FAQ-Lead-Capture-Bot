BEGIN;

-- =========================================================
-- 1. EXTENSIONS
-- =========================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =========================================================
-- 2. ENUMS
-- =========================================================
CREATE TYPE role_enum AS ENUM ('Owner','Admin','Manager','Agent');
CREATE TYPE conversation_status_enum AS ENUM ('open','closed','human');
CREATE TYPE sender_type_enum AS ENUM ('user','bot','agent');

-- =========================================================
-- 3. TABLES
-- =========================================================

-- TENANTS
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subdomain TEXT,
  domain TEXT,
  logo_url TEXT,
  primary_color VARCHAR(7),
  subscription_plan TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'active',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROFILES
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  job_title TEXT,
  company TEXT,
  timezone TEXT DEFAULT 'UTC',
  role role_enum NOT NULL DEFAULT 'Agent',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SETTINGS
CREATE TABLE settings (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  bot_name TEXT,
  primary_color VARCHAR(7),
  default_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONVERSATIONS
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  title TEXT,
  status conversation_status_enum DEFAULT 'open',
  assigned_agent_id UUID REFERENCES auth.users(id),
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_type sender_type_enum NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KNOWLEDGE BASE
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  tags TEXT[],
  file_type TEXT,
  file_path TEXT,
  source_url TEXT,
  embedding_vector VECTOR(1536),
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- 4. ENABLE REALTIME
-- =========================================================
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- =========================================================
-- 5. INDEXES
-- =========================================================
CREATE INDEX idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX idx_conversations_tenant ON conversations(tenant_id);
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_tenant ON messages(tenant_id);
CREATE INDEX idx_kb_tenant ON knowledge_base(tenant_id);

-- =========================================================
-- 6. ENABLE RLS
-- =========================================================
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- 7. HELPER FUNCTION (prevents RLS recursion)
-- =========================================================
CREATE OR REPLACE FUNCTION get_my_tenant_id()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT tenant_id FROM profiles
  WHERE id = auth.uid()
  LIMIT 1;
$$;

-- =========================================================
-- 8. RLS POLICIES
-- =========================================================

-- TENANTS
CREATE POLICY tenants_access
ON tenants FOR ALL
USING (id = get_my_tenant_id());

-- PROFILES
CREATE POLICY profiles_read
ON profiles FOR SELECT
USING (
  id = auth.uid()
  OR tenant_id = get_my_tenant_id()
);

CREATE POLICY profiles_insert
ON profiles FOR INSERT
WITH CHECK (id = auth.uid());

CREATE POLICY profiles_update
ON profiles FOR UPDATE
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY profiles_delete
ON profiles FOR DELETE
USING (id = auth.uid());

-- SETTINGS
CREATE POLICY settings_read
ON settings FOR SELECT
USING (tenant_id = get_my_tenant_id());

CREATE POLICY settings_modify
ON settings FOR ALL
USING (tenant_id = get_my_tenant_id())
WITH CHECK (tenant_id = get_my_tenant_id());

-- CONVERSATIONS
CREATE POLICY conversations_access
ON conversations FOR ALL
USING (tenant_id = get_my_tenant_id())
WITH CHECK (tenant_id = get_my_tenant_id());

-- MESSAGES
CREATE POLICY messages_access
ON messages FOR ALL
USING (tenant_id = get_my_tenant_id())
WITH CHECK (tenant_id = get_my_tenant_id());

-- KNOWLEDGE BASE
CREATE POLICY kb_access
ON knowledge_base FOR ALL
USING (tenant_id = get_my_tenant_id())
WITH CHECK (tenant_id = get_my_tenant_id());

-- =========================================================
-- 9. TRIGGERS
-- =========================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tenants_updated
BEFORE UPDATE ON tenants
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_profiles_updated
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_settings_updated
BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_conversations_updated
BEFORE UPDATE ON conversations
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================================================
-- 10. RELOAD SCHEMA CACHE
-- =========================================================
NOTIFY pgrst, 'reload schema';

COMMIT;