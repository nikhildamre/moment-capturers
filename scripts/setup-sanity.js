/**
 * Sanity Setup Script
 * Run this script to initialize your Sanity project and import sample data
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up Sanity CMS for Moment Capturers Portfolio...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env.local file not found!')
  console.log('Please create .env.local file with your Sanity configuration:')
  console.log('')
  console.log('NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id')
  console.log('NEXT_PUBLIC_SANITY_DATASET=production')
  console.log('SANITY_API_TOKEN=your_api_token')
  console.log('')
  console.log('You can get these values from https://sanity.io/manage')
  process.exit(1)
}

// Read environment variables
require('dotenv').config({ path: envPath })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  console.log('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}

console.log(`📋 Project ID: ${projectId}`)
console.log(`📊 Dataset: ${dataset}`)
console.log('')

try {
  // Install Sanity CLI if not already installed
  console.log('📦 Installing Sanity CLI...')
  execSync('npm install -g @sanity/cli', { stdio: 'inherit' })

  // Login to Sanity (if not already logged in)
  console.log('🔐 Checking Sanity authentication...')
  try {
    execSync('sanity auth whoami', { stdio: 'pipe' })
    console.log('✅ Already authenticated with Sanity')
  } catch (error) {
    console.log('🔑 Please log in to Sanity...')
    execSync('sanity auth login', { stdio: 'inherit' })
  }

  // Deploy GraphQL API
  console.log('🚀 Deploying GraphQL API...')
  execSync(`sanity graphql deploy --playground`, { stdio: 'inherit' })

  console.log('')
  console.log('✅ Sanity setup complete!')
  console.log('')
  console.log('Next steps:')
  console.log('1. Run "npm run dev" to start the development server')
  console.log('2. Visit http://localhost:3000/studio to access Sanity Studio')
  console.log('3. Create your first content in the studio')
  console.log('4. The website will automatically fetch and display your content')
  console.log('')
  console.log('📚 Documentation: https://www.sanity.io/docs')

} catch (error) {
  console.error('❌ Setup failed:', error.message)
  console.log('')
  console.log('Manual setup instructions:')
  console.log('1. Install Sanity CLI: npm install -g @sanity/cli')
  console.log('2. Login to Sanity: sanity auth login')
  console.log('3. Deploy GraphQL API: sanity graphql deploy --playground')
  process.exit(1)
}