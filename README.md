# Basil - Cultural Cards App 🌸

A React web app for sharing cultural moments through kawaii-illustrated cards with QR code support.

## Features

- 🎨 Beautiful card-based UI with kawaii aesthetic
- 🔐 User authentication (signup/login via Netlify Identity)
- 📸 Image upload for card illustrations
- 🎵 Music support (Spotify/YouTube URLs or MP3 uploads)
- 🗑️ Delete your own cards
- 📱 Mobile-responsive design
- 🔗 QR code friendly (access cards via `?id=XXX`)

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Database**: Neon (Serverless PostgreSQL)
- **Authentication**: Netlify Identity
- **Storage**: Netlify Blobs
- **Routing**: React Router
- **Icons**: Lucide React
- **Hosting**: Netlify (optimized for Netlify deployment)

## Setup Instructions

### 1. Create Neon Database

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Create a database (or use the default database)
4. Copy your connection string (it looks like `postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require`)

### 2. Set Up Database Schema

Connect to your Neon database and run:

```sql
-- Create cards table
CREATE TABLE cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  music_url TEXT,
  music_file_url TEXT,
  category TEXT,
  card_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX cards_card_id_idx ON cards(card_id);
CREATE INDEX cards_user_id_idx ON cards(user_id);
CREATE INDEX cards_category_idx ON cards(category);
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Variables

Create a `.env` file in the root:

```env
VITE_NEON_DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require
VITE_NETLIFY_SITE_URL=https://your-site.netlify.app
```

### 5. Run Development Server

For local development:

```bash
npm run dev
```

Visit `http://localhost:5173`

**Note**: Some features (authentication, file storage) require Netlify Functions and will only work when deployed to Netlify or running with Netlify CLI:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Run with Netlify Dev
netlify dev
```

### 6. Deploy to Netlify

#### Option A: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **⚠️ IMPORTANT: Add environment variables BEFORE deploying:**
   - Go to **Site Settings → Environment Variables** (or **Build & Deploy → Environment**)
   - Click "Add a variable" and add:
     - Key: `VITE_NEON_DATABASE_URL`
     - Value: Your Neon database connection string (e.g., `postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require`)
     - Scope: Select "All deploy contexts" or at least "Production"
   - Add another variable:
     - Key: `VITE_NETLIFY_SITE_URL`
     - Value: Your Netlify site URL (you can use a placeholder initially, like `https://my-site.netlify.app`, and update it after deployment)
     - Scope: Select "All deploy contexts" or at least "Production"
7. Deploy!
8. After first deployment, update `VITE_NETLIFY_SITE_URL` with your actual Netlify URL if you used a placeholder
9. If you update environment variables, trigger a new deploy with "Clear cache and deploy site"

**Note:** Vite requires environment variables at build time, not runtime. If you see "Neon database is not configured" error, check the Troubleshooting section.

#### Option B: Netlify CLI

```bash
# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

### 7. Enable Netlify Identity

After deploying to Netlify:

1. Go to your site dashboard on Netlify
2. Navigate to Site Settings → Identity
3. Click "Enable Identity"
4. Under Registration preferences, choose "Open" or "Invite only"
5. Under External providers (optional), you can enable Google, GitHub, etc.
6. Under Emails, customize the email templates if needed

### 8. Configure Site URL

Make sure to update the `VITE_NETLIFY_SITE_URL` environment variable with your actual Netlify site URL after deployment.

## Usage

### For Users

1. **Sign Up**: Click "Sign Up" to create an account (uses Netlify Identity)
2. **Add Cards**: Click "Add Card" to create a new cultural card
   - Upload a kawaii illustration
   - Add title and description
   - Optionally add category and music
3. **View Cards**: Browse all cards on the home page
4. **Delete Cards**: You can only delete cards you created

### QR Code Usage

Each card has a unique ID (e.g., `ABC123`). The URL format is:

```
https://your-site.netlify.app/?id=ABC123
```

You can:
1. Generate QR codes pointing to these URLs
2. Print them on physical cards
3. When scanned, users see the full card details

### Adding Music

**Option 1: URL** (Spotify, YouTube, SoundCloud)
- Just paste the URL (e.g., `https://open.spotify.com/track/...`)
- The app will automatically embed the player

**Option 2: Upload MP3**
- Upload your own MP3 file
- Files are stored in Netlify Blobs

## Project Structure

```
basil/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login & SignUp
│   │   ├── Cards/          # Card display components
│   │   ├── Forms/          # Add card form
│   │   ├── Layout/         # Navbar
│   │   └── Music/          # Audio player
│   ├── hooks/
│   │   ├── useAuth.js      # Authentication logic (Netlify Identity)
│   │   └── useCards.js     # Card CRUD operations (Neon)
│   ├── lib/
│   │   ├── neon.js         # Neon database client
│   │   ├── auth.js         # Netlify Identity helpers
│   │   └── storage.js      # Netlify Blobs helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify/
│   └── functions/          # Netlify Functions for file upload/delete
├── .env
├── .env.example
├── package.json
├── netlify.toml
└── README.md
```

## Differences from Supabase Version

This version uses Neon and Netlify services instead of Supabase:

- **Database**: Neon (serverless PostgreSQL) instead of Supabase Database
- **Authentication**: Netlify Identity instead of Supabase Auth
- **Storage**: Netlify Blobs instead of Supabase Storage
- **Real-time**: Removed (Neon doesn't have built-in real-time; manual refresh needed)
- **Row Level Security**: Not available in Neon (implement in application logic)

## Troubleshooting

### Images/Music not uploading

- Ensure you're running on Netlify (deployed or via `netlify dev`)
- Check that Netlify Functions are working
- Verify Netlify Blobs is enabled for your site

### "Error loading cards: Neon database is not configured" on Netlify

This error means the `VITE_NEON_DATABASE_URL` environment variable was not available during the build process. Vite bakes environment variables into the JavaScript bundle at build time, so they must be configured correctly in Netlify.

**Solution:**

1. **Check Environment Variables in Netlify:**
   - Go to your site in Netlify Dashboard
   - Navigate to **Site Settings → Environment Variables** (or **Build & Deploy → Environment**)
   - Verify that `VITE_NEON_DATABASE_URL` is set with your full Neon connection string
   - Make sure it's scoped for **"All deploy contexts"** or at least **"Production"**

2. **Trigger a New Deploy:**
   - After adding/updating the environment variable, trigger a new deployment
   - Go to **Deploys → Trigger deploy → Clear cache and deploy site**
   - This ensures the new environment variable is used during the build

3. **Verify the Variable Format:**
   - The connection string should look like: `postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require`
   - Copy it exactly from your Neon dashboard (don't add quotes or extra spaces)

4. **Check Build Logs:**
   - In Netlify, go to your latest deploy and check the build logs
   - Look for any warnings about environment variables
   - The build should complete successfully

**Note:** Unlike traditional server-side apps, Vite apps require environment variables at **build time**, not runtime. Simply setting them after deployment won't work - you must rebuild.

### Cards not showing (other reasons)

- Check browser console for errors
- Ensure the cards table exists in your Neon database
- Verify database schema matches the required structure (see Setup Instructions)

### Authentication issues

- Make sure Netlify Identity is enabled in your site settings
- Check that you're accessing the site via the correct URL
- For local development, use `netlify dev` instead of `npm run dev`

### Local Development

For full functionality in local development, use:

```bash
netlify dev
```

This runs the Vite dev server with Netlify Functions support.

## Contributing

This is a personal project for friends, but feel free to fork and customize for your own use!

## License

MIT