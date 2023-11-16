import { defineCollection, reference, z } from 'astro:content'

const components = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.union([z.literal('preview'), z.literal('upcoming')]).optional(),
    stories: reference('stories').optional(),
    types: reference('types').optional(),
  }),
})

const styling = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
  }),
})

const stories = defineCollection({
  type: 'data',
  schema: z.record(z.string(), z.string()),
})

const types = defineCollection({
  type: 'data',
  schema: z.record(
    z.string(),
    z.record(
      z.string(),
      z.object({
        type: z.string(),
        isRequired: z.boolean(),
        defaultValue: z.string().optional(),
        description: z.string().optional(),
      }),
    ),
  ),
})

const overview = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
  }),
})

const changelog = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
  }),
})

export const collections = {
  changelog,
  components,
  overview,
  stories,
  styling,
  types,
}
