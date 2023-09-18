import { defineCollection, reference, z } from 'astro:content'

const components = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    stories: reference('stories').optional(),
    types: reference('types').optional(),
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

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
  }),
})

export const collections = {
  components,
  docs,
  stories,
  types,
}
