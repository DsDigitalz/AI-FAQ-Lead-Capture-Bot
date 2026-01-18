# HelplyAI - Supabase Setup Guide

## 🚀 Quick Setup

### 1. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Dashboard Configuration

#### Authentication Settings

1. Go to **Authentication > Settings**
2. Configure **Site URL**: `http://localhost:5173` (development) / `https://yourdomain.com` (production)
3. Configure **Redirect URLs**:
   - `http://localhost:5173/dashboard` (development)
   - `https://yourdomain.com/dashboard` (production)

#### Email Confirmation

1. Go to **Authentication > Settings**
2. Enable **Enable email confirmations**
3. Set **Email Template** for confirmation emails

#### OAuth Providers

##### Google OAuth

1. Go to **Authentication > Providers**
2. Enable **Google**
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Set redirect URL: `https://your-project.supabase.co/auth/v1/callback`

##### Other Providers

Configure additional OAuth providers as needed (GitHub, etc.)

### 3. Database Setup

#### Run the Schema

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy and paste the contents of `database/schema.sql`
3. Click **Run** to execute the schema

#### Verify Tables Created

Check that these tables exist:

- `tenants`
- `profiles`
- `tenant_users`
- `conversations`
- `messages`
- `knowledge_base`
- `faqs`
- `api_keys`
- `channels`
- `analytics`

### 4. Row Level Security (RLS)

The schema automatically enables RLS on all tables. The policies ensure:

- Users can only access data from their tenants
- Admins have elevated permissions
- Profile data is properly isolated

### 5. Testing the Setup

#### Test User Registration

1. Visit `/signup`
2. Create a new account
3. Check your email for confirmation
4. Confirm the email
5. Try signing in

#### Test OAuth

1. Visit `/signin`
2. Click "Continue with Google"
3. Complete OAuth flow
4. Verify dashboard access

#### Test Password Reset

1. Visit `/forgot-password`
2. Enter your email
3. Check email for reset link
4. Use reset link to change password

## 🔧 Development vs Production

### Development

- Use `http://localhost:5173` for redirect URLs
- Enable email confirmation for testing
- Use Supabase local development if preferred

### Production

- Update all redirect URLs to your domain
- Ensure HTTPS is enabled
- Configure proper email templates
- Set up monitoring and logging

## 🛡️ Security Best Practices

### Environment Variables

- Never commit `.env` files
- Use different Supabase projects for dev/staging/prod
- Rotate API keys regularly

### RLS Policies

- All queries respect tenant isolation
- No direct user_id references in application code
- Use `auth.uid()` for user identification

### Authentication Flow

- Always check `user.email_confirmed_at` before setup
- Handle unconfirmed users gracefully
- Implement proper session management

## 🚨 Troubleshooting

### Common Issues

#### "Permission denied for schema auth"

- Remove all `REFERENCES auth.users(id)` from schema
- Use RLS policies instead of foreign keys

#### "User not found" errors

- Ensure profile setup happens after email confirmation
- Check `handle_new_user_setup` function execution

#### OAuth redirect issues

- Verify redirect URLs in Supabase dashboard match your app routes
- Check browser console for errors during OAuth flow
- Ensure proper URL encoding and no trailing slashes
- For Google OAuth, verify the client ID and secret are correct
- Check that the OAuth provider is enabled in Supabase
- Ensure the redirect URL includes `/auth/callback` route

#### Google OAuth specific issues

- **"redirect_uri_mismatch"**: Make sure all redirect URLs are configured in both Google Cloud Console and Supabase
- **"access_denied"**: User denied permissions or OAuth app not approved
- **"invalid_client"**: Wrong client ID or secret
- **Stuck on loading**: Check that `/auth/callback` route exists and AuthCallback component is working
- **Not redirecting to dashboard**: Ensure AuthCallback component properly handles the session

#### Session persistence issues

- Check localStorage for Supabase session
- Verify `persistSession: true` in client config
- Clear browser data if needed

### Debug Mode

Enable debug logging in development:

```javascript
// In supabase.js
export const supabase = createClient(url, key, {
  auth: { debug: true },
});
```

## 📋 API Reference

### Authentication Methods

```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password",
  options: { data: { full_name: "John Doe" } },
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password",
});

// Google OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: "/dashboard" },
});

// Password reset
const { error } = await supabase.auth.resetPasswordForEmail(
  "user@example.com",
  { redirectTo: "/reset-password" }
);

// Sign out
const { error } = await supabase.auth.signOut();
```

### Database Queries

All queries automatically respect RLS:

```javascript
// Get user profile
const { data, error } = await supabase
  .from("profiles")
  .select("*, tenant_users(*)")
  .eq("user_id", user.id)
  .single();

// Get tenant conversations
const { data, error } = await supabase
  .from("conversations")
  .select("*")
  .eq("tenant_id", tenantId);
```

## 🎯 Next Steps

1. Test all authentication flows
2. Implement protected routes for sensitive pages
3. Add user onboarding flow
4. Set up monitoring and analytics
5. Configure backup and recovery procedures
