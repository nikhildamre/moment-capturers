import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'

import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'moment-capturers-studio',
  title: 'Moment Capturers Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    deskTool(),
    visionTool(),
    colorInput(),
    imageHotspotArrayPlugin(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Studio configuration
  studio: {
    components: {
      // Custom studio components can be added here
    },
  },

  // Document actions
  document: {
    actions: (prev, context) => {
      // Customize document actions if needed
      return prev
    },
  },
})