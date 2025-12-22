# 📦 GitHub Upload Guide - Moment Capturers Portfolio

## Prerequisites

### 1. Install Git
**Download Git for Windows:**
- Visit: https://git-scm.com/download/win
- Download and install Git
- During installation, select "Git from the command line and also from 3rd-party software"
- Restart your terminal/command prompt after installation

### 2. Create GitHub Account
- Visit: https://github.com
- Sign up for a free account if you don't have one

## Step-by-Step Upload Process

### Step 1: Initialize Git Repository

Open your terminal in the project folder and run:

```bash
git init
```

### Step 2: Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Create .gitignore File

The project already has a `.gitignore` file, but verify it includes:

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
```

### Step 4: Add All Files to Git

```bash
git add .
```

### Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: Moment Capturers Photography Portfolio"
```

### Step 6: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Fill in:
   - **Repository name**: `moment-capturers-portfolio`
   - **Description**: "Professional photography portfolio website with stunning animations"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 7: Connect Local Repository to GitHub

GitHub will show you commands. Use these (replace with your username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/moment-capturers-portfolio.git
git branch -M main
git push -u origin main
```

### Step 8: Push Your Code

```bash
git push -u origin main
```

You'll be prompted to enter your GitHub credentials.

## Alternative: Using GitHub Desktop (Easier)

### Option 1: GitHub Desktop (Recommended for Beginners)

1. **Download GitHub Desktop**
   - Visit: https://desktop.github.com
   - Install GitHub Desktop

2. **Add Repository**
   - Open GitHub Desktop
   - Click "File" → "Add Local Repository"
   - Browse to your project folder
   - Click "Add Repository"

3. **Create Repository on GitHub**
   - Click "Publish repository" button
   - Enter repository name: `moment-capturers-portfolio`
   - Add description
   - Choose Public or Private
   - Click "Publish Repository"

4. **Done!** Your code is now on GitHub

## Future Updates

### When You Make Changes:

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Or Using GitHub Desktop:
1. Open GitHub Desktop
2. Review changes in the left panel
3. Write commit message
4. Click "Commit to main"
5. Click "Push origin"

## Important Files to Keep Private

Make sure these are in `.gitignore` (already included):
- `.env.local` - Contains sensitive API keys
- `.env` - Environment variables
- `node_modules/` - Dependencies (too large)
- `.next/` - Build files

## Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Visit: https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
6. Add Environment Variables (from `.env.local`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `RESEND_API_KEY`
7. Click "Deploy"
8. Your site will be live at: `https://your-project.vercel.app`

### Option 2: Netlify (Free)

1. Visit: https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub
5. Select your repository
6. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Add environment variables
8. Click "Deploy"

### Option 3: GitHub Pages (Static Only)

For static export:

1. Update `next.config.js`:
```js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. Build and export:
```bash
npm run build
```

3. Push to GitHub
4. Go to repository Settings → Pages
5. Select branch: `main`
6. Select folder: `/out`
7. Save

## Project Structure

```
moment-capturers-portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── Landing.tsx       # Hero section
│   ├── Portfolio.tsx     # Portfolio gallery
│   ├── About.tsx         # About section
│   ├── Testimonials.tsx  # Testimonials
│   ├── Contact.tsx       # Contact form
│   └── BrandsSection.tsx # Client logos
├── lib/                   # Utilities
│   ├── sanity.ts         # Sanity CMS client
│   ├── animations.ts     # Animation configs
│   └── hooks/            # Custom hooks
├── public/               # Static assets
├── schemas/              # Sanity schemas
├── .env.local           # Environment variables (NOT in Git)
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
└── README.md            # Project documentation
```

## Features to Highlight in README

Your portfolio includes:
- ✨ **Stunning Animations**: Particle networks, magnetic cursor, floating elements
- 🎨 **Creative Backgrounds**: Animated gradients and dynamic effects
- 📸 **Portfolio Gallery**: Continuous vertical flow with category filtering
- 🏢 **Brands Section**: Infinite scrolling client logos
- 💬 **Contact Form**: Email integration with Resend
- 📱 **Fully Responsive**: Works on all devices
- ♿ **Accessible**: WCAG AA compliant
- ⚡ **Performance Optimized**: Fast loading with Next.js
- 🎭 **Curtain Reveals**: Dramatic entrance animations
- 🔄 **Infinite Animations**: Non-stop flowing effects

## Troubleshooting

### Issue: Git not recognized
**Solution**: Install Git from https://git-scm.com/download/win and restart terminal

### Issue: Permission denied (publickey)
**Solution**: Use HTTPS instead of SSH, or set up SSH keys:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/moment-capturers-portfolio.git
```

### Issue: Large files error
**Solution**: Make sure `node_modules/` and `.next/` are in `.gitignore`

### Issue: Merge conflicts
**Solution**: 
```bash
git pull origin main --rebase
# Resolve conflicts
git add .
git rebase --continue
git push
```

## Quick Commands Reference

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name
```

## Support

If you encounter issues:
1. Check the error message carefully
2. Search on Google: "git [error message]"
3. Visit: https://docs.github.com
4. Ask on: https://stackoverflow.com

## Next Steps After Upload

1. ✅ Upload to GitHub
2. ✅ Deploy to Vercel/Netlify
3. ✅ Add custom domain (optional)
4. ✅ Set up Sanity CMS
5. ✅ Configure email service (Resend)
6. ✅ Test all features
7. ✅ Share your portfolio!

---

**Your portfolio is ready to shine on GitHub! 🚀✨**

For any questions, refer to:
- GitHub Docs: https://docs.github.com
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
