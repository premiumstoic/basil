# Netlify Deployment Guide for Basil

## Quick Fix: "Error loading cards: Neon database is not configured"

If you're seeing this error on your deployed Netlify site, follow these steps:

### Step 1: Verify Environment Variables in Netlify

1. Log in to [Netlify](https://app.netlify.com)
2. Go to your site dashboard
3. Navigate to **Site Settings → Environment Variables** (or **Build & Deploy → Environment**)
4. Check if `VITE_NEON_DATABASE_URL` is listed

### Step 2: Add or Update Environment Variables

If the variable is missing or incorrect:

1. Click **"Add a variable"** (or **"Edit"** if it exists)
2. Set the following:
   - **Key**: `VITE_NEON_DATABASE_URL`
   - **Value**: Your full Neon connection string (e.g., `postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require`)
   - **Scopes**: Select **"All deploy contexts"** or at least **"Production"**
3. Also verify `VITE_NETLIFY_SITE_URL` is set:
   - **Key**: `VITE_NETLIFY_SITE_URL`
   - **Value**: Your Netlify site URL (e.g., `https://your-site.netlify.app`)

### Step 3: Trigger a New Deployment

**Important**: Environment variables are baked into the build, so you MUST rebuild after changing them.

1. Go to **Deploys** tab
2. Click **"Trigger deploy"**
3. Select **"Clear cache and deploy site"**
4. Wait for the deploy to complete

### Step 4: Verify the Fix

1. Once deployed, visit your site
2. Check the browser console (F12 → Console)
3. You should NOT see any red error messages about Neon database
4. Cards should load properly

## Why This Happens

Unlike traditional server-side applications, Vite (the build tool used by this app) requires environment variables at **build time**, not runtime. This means:

- ✅ Environment variables must be set BEFORE you build
- ✅ Changing env vars requires a new build/deploy
- ❌ Setting env vars after deployment won't work
- ❌ The build won't automatically rebuild when you change env vars

## Troubleshooting

### "I set the environment variable but still see the error"

- Did you trigger a new deploy after setting the variable?
- Did you clear the cache when deploying?
- Check the build logs: Does it show the warning about missing env var?

### "I don't see the environment variables section in Netlify"

- The location might vary:
  - Try **Site Settings → Environment Variables**
  - Or **Site Settings → Build & Deploy → Environment**
- Make sure you're on the correct site

### "The build is failing"

- Check the deploy logs in Netlify
- Look for any errors during the build process
- Make sure your database is accessible (check Neon dashboard)

### "How do I find my Neon connection string?"

1. Go to [neon.tech](https://neon.tech) and log in
2. Select your project
3. Go to the **Dashboard** or **Connection Details**
4. Copy the connection string (it starts with `postgresql://`)
5. Make sure to include `?sslmode=require` at the end

## Build-Time Warning

This app now includes a helpful warning during production builds. If you build locally with:

```bash
npm run build
```

And the environment variable is missing, you'll see:

```
⚠️  WARNING: VITE_NEON_DATABASE_URL is not set!

The application will not be able to connect to the database.
Make sure to set this environment variable in your deployment platform.
```

This warning also appears in Netlify's build logs if the variable is not set.

## Best Practices

1. **Always set environment variables before first deployment**
2. **Document your environment variables** (without exposing secrets)
3. **Test locally first** with a `.env` file before deploying
4. **Use "Clear cache and deploy"** when changing environment variables
5. **Check build logs** to confirm env vars are available during build

## Questions?

If you're still experiencing issues:

1. Check the browser console for detailed error messages
2. Review the Netlify build logs for warnings
3. Verify your Neon database is running and accessible
4. Make sure the connection string is correct (no extra spaces, quotes, etc.)
