import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'author',
      title: 'Client Name',
      type: 'string',
      description: 'Name of the person giving the testimonial',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      description: 'The testimonial text from the client',
      validation: (Rule) => Rule.required().min(10).max(500),
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      description: 'Optional photo of the client',
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
      ],
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
      description: 'Client\'s company or organization (optional)',
    }),
    defineField({
      name: 'position',
      title: 'Job Title/Position',
      type: 'string',
      description: 'Client\'s job title or position (optional)',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description: 'Type of photography project this testimonial relates to',
      options: {
        list: [
          { title: 'Food Photography', value: 'Food' },
          { title: 'Fashion Photography', value: 'Fashion' },
          { title: 'Event Photography', value: 'Events' },
          { title: 'Corporate Photography', value: 'Corporate' },
          { title: 'Portrait Photography', value: 'Portrait' },
          { title: 'General', value: 'General' },
        ],
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Client rating (1-5 stars)',
      validation: (Rule) => Rule.min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'date',
      title: 'Testimonial Date',
      type: 'date',
      description: 'When the testimonial was given',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Mark as featured to prioritize in carousel',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this testimonial should appear (lower numbers first)',
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
      title: 'Rating (Highest First)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
      media: 'image',
      company: 'company',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, media, company, rating } = selection
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: title,
        subtitle: `${stars}${company ? ` • ${company}` : ''} • ${subtitle?.substring(0, 60)}...`,
        media: media,
      }
    },
  },
})