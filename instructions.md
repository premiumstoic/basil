Create a complete React + Vite + Supabase app called "Basil" for cultural cards with QR code support. Here are the requirements:

## Project Setup
1. Initialize a Vite React project with Tailwind CSS
2. Install dependencies: @supabase/supabase-js, react-router-dom, lucide-react, qrcode
3. Set up Tailwind with PostCSS and Autoprefixer

## Project Structure
```
basil/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── Cards/
│   │   │   ├── CardGrid.jsx
│   │   │   ├── CardItem.jsx
│   │   │   └── CardDetail.jsx
│   │   ├── Forms/
│   │   │   └── AddCardForm.jsx
│   │   ├── Layout/
│   │   │   └── Navbar.jsx
│   │   └── Music/
│   │       └── AudioPlayer.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useCards.js
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Technical Requirements

### Supabase Setup (src/lib/supabase.js)
- Create Supabase client using environment variables
- Helper functions: uploadImage, uploadAudio, deleteFile
- Use buckets: 'card-images' and 'card-music'

### Database Schema
Create a 'cards' table with:
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- title (text)
- description (text)
- image_url (text)
- music_url (text, nullable)
- music_file_url (text, nullable)
- category (text, nullable)
- card_id (text, unique - for QR codes)
- created_at, updated_at (timestamps)

### Authentication Hook (src/hooks/useAuth.js)
- Track current user state
- signUp(email, password)
- signIn(email, password)
- signOut()
- Listen to auth state changes

### Cards Hook (src/hooks/useCards.js)
- Fetch all cards (ordered by created_at desc)
- getCardById(cardId) - for QR code routing
- addCard(cardData)
- deleteCard(id) - only owner can delete
- generateCardId() - random 6-char uppercase ID
- Real-time subscriptions for card changes

### Components

**Navbar (src/components/Layout/Navbar.jsx)**
- Logo "🌸 Basil" links to home
- If logged in: Show "Add Card" button, username, "Logout"
- If not logged in: Show "Login" and "Sign Up"
- Pink/purple theme

**Login & SignUp (src/components/Auth/)**
- Email/password forms
- Error handling
- Link to switch between login/signup
- Centered layout with gradient background
- Kawaii aesthetic (use 🌸 emoji)

**CardGrid (src/components/Cards/CardGrid.jsx)**
- Display all cards in responsive grid (1/2/3/4 columns)
- Loading state with spinner
- Empty state with message
- Gradient background (pink-50 to purple-50)

**CardItem (src/components/Cards/CardItem.jsx)**
- Card preview with image, title, description (2 lines max)
- Category badge if exists
- Music icon if has music
- Delete button (only shows to owner on hover)
- Click to view detail
- Show card ID in bottom-right corner

**CardDetail (src/components/Cards/CardDetail.jsx)**
- Modal overlay triggered by ?id=XXX in URL
- Full image, title, description
- Category badge
- Audio player if has music
- Back button to close
- Error state if card not found

**AddCardForm (src/components/Forms/AddCardForm.jsx)**
- Protected route (requires auth)
- Image upload with preview
- Title (required)
- Description textarea (required)
- Category (optional text input)
- Music section with 3 options:
  1. No music
  2. URL (Spotify/YouTube/SoundCloud)
  3. Upload MP3 file
- Submit button with loading state
- Navigate to home after success

**AudioPlayer (src/components/Music/AudioPlayer.jsx)**
- Handle Spotify embeds (extract track ID)
- Handle YouTube embeds (extract video ID)
- Handle direct MP3 files (HTML5 audio)
- Fallback for other URLs (show link)
- Styled with gradient background

### Routing (src/App.jsx)
- BrowserRouter with routes:
  - / - Home (CardGrid + CardDetail if ?id=XXX)
  - /login - Login page
  - /signup - SignUp page
  - /add - AddCardForm (protected)
- ProtectedRoute component for auth-required pages

### Styling (src/index.css)
- Import Tailwind directives
- Custom utilities for line-clamp-1 and line-clamp-2
- System fonts
- Smooth scrolling

### Theme & Design
- Primary colors: Pink (pink-500) and Purple
- Gradients: from-pink-50 to-purple-50
- Rounded corners: rounded-2xl for cards
- Shadows: shadow-md, shadow-lg
- Hover effects: scale, shadow changes
- Kawaii aesthetic: soft colors, rounded shapes, emoji (🌸)
- Mobile-first responsive design

### Environment Variables (.env.example)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### README.md
Include:
- Project description
- Features list
- Tech stack
- Setup instructions (Supabase SQL + Storage)
- Deployment guide (Vercel)
- QR code usage
- Troubleshooting section

### Important Features
1. Real-time updates - cards refresh automatically
2. User can only delete their own cards
3. All cards are public (anyone can view)
4. Authenticated users can add cards
5. QR-friendly routing with ?id=XXX
6. Music embeds for Spotify, YouTube, SoundCloud
7. MP3 file upload support
8. Mobile-responsive
9. Loading states everywhere
10. Error handling with user-friendly messages

### Security
- Row Level Security (RLS) policies:
  - SELECT: public (anyone can view)
  - INSERT: authenticated only
  - UPDATE/DELETE: only card owner

Generate all files with complete, production-ready code. Use modern React patterns (hooks, functional components). Include proper error handling and loading states. Make it beautiful and user-friendly.
