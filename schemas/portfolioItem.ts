import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  icon: () => '📸',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'Name of the photography project or shoot',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Photography category for this project',
      options: {
        list: [
          { title: 'Food Photography', value: 'Food' },
          { title: 'Fashion Photography', value: 'Fashion' },
          { title: 'Event Photography', value: 'Events' },
          { title: 'Corporate Photography', value: 'Corporate' },
          { title: 'Portrait Photography', value: 'Portrait' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      description: 'Upload multiple images for this portfolio item',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      description: 'Detailed description of the photography project',
      validation: (Rule) => Rule.max(500),
      rows: 4,
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Name of the client (optional)',
    }),
    defineField({
      name: 'date',
      title: 'Project Date',
      type: 'date',
      description: 'When the project was completed',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Mark as featured to highlight in portfolio',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Keywords and tags for this project',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this item should appear (lower numbers first)',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'images.0',
      client: 'client',
    },
    prepare(selection) {
      const { title, category, media, client } = selection
      return {
        title: title,
        subtitle: `${category}${client ? ` • ${client}` : ''}`,
        media: media,
      }
    },
  },
})