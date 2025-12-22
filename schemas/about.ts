import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'content',
      title: 'Biography Text',
      type: 'text',
      description: 'Photographer biography and background information',
      validation: (Rule) => Rule.required().min(50).max(2000),
      rows: 8,
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Optional profile photo for the about section',
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
      name: 'skills',
      title: 'Skills & Specialties',
      type: 'array',
      description: 'List of photography skills and specialties',
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
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Number of years in photography',
      validation: (Rule) => Rule.min(0).max(50),
    }),
  ],
  preview: {
    select: {
      title: 'content',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: 'About Section',
        subtitle: title ? `${title.substring(0, 60)}...` : 'No content',
      }
    },
  },
})