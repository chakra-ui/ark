import { defineCollection, reference, z } from 'astro:content'

const components = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    specification: z.string().optional(),
    label: z.string().optional(),
    resources: z
      .object({
        zag: z.string().optional(),
        w3c: z.string().optional(),
      })
      .optional(),
    types: reference('types').optional(),
  }),
})

const providers = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    specification: z.string().optional(),
    label: z.string().optional(),
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
  providers,
  styling,
  types,
}
