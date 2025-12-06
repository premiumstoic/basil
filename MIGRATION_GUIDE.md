# Migration History

## Phase 1: Supabase to Neon + Netlify (Initial Migration)
This document originally described the migration from Supabase to Neon database with Netlify services.

**Note:** This migration has been superseded by Phase 2 (see below).

---

## Phase 2: Netlify to Vercel (Current)

Due to deployment issues with Netlify Blobs and Netlify Identity, the project was migrated from Netlify to Vercel.

### What Changed

**Database**: Neon PostgreSQL (unchanged)  
**Platform**: Netlify → **Vercel**  
**Auth**: Netlify Identity → **JWT + Neon Database**  
**Storage**: Netlify Blobs → **Vercel Blob**  

### Why Vercel?

1. ✅ **Simpler Auth**: JWT tokens stored in database instead of Netlify Identity widget
2. ✅ **Reliable Storage**: Vercel Blob works out of the box
3. ✅ **Better DX**: Clearer error messages and documentation
4. ✅ **Easier Setup**: Less configuration required

### Current Deployment Guide

See **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** for complete deployment instructions.

---

## Legacy Information (Phase 1: Supabase → Netlify)

For historical reference, the original migration from Supabase to Neon+Netlify involved:

- Moving from Supabase Auth to Netlify Identity
- Moving from Supabase Storage to Netlify Blobs
- Keeping the same React/Vite frontend structure

This phase has been replaced by the Vercel migration for better reliability and developer experience.
