# basil

A simple single-file web app for displaying card data via URL parameters.

## Usage

Open `index.html` in a browser with an optional `id` parameter:

- Default (no parameter): `index.html` - displays the first card (ID: 001)
- Specific card: `index.html?id=002` - displays the card with ID 002
- Invalid ID: `index.html?id=999` - displays a "Not Found" message

## Available Cards

- `001` - Mountain Sunrise
- `002` - Ocean Waves
- `003` - Forest Trail
- `004` - Desert Sunset

## Features

- 📱 Mobile-first responsive design
- 🎨 Clean card UI with rounded corners and subtle shadows
- 🔒 XSS-safe DOM manipulation
- 🚀 No dependencies - pure HTML/CSS/JS
- 💻 System fonts for optimal cross-platform display