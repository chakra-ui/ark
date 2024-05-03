import { defineCollection, defineConfig, s } from 'velite'

const components = defineCollection({
  name: 'Component',
  pattern: 'components/**/*.mdx',
  schema: s.object({
    id: s.string(),
    title: s.string(),
    description: s.string(),
    resources: s
      .object({
        zag: s.string().optional(),
        w3c: s.string().optional(),
      })
      .optional(),
    metadata: s.metadata(),
    content: s.markdown(),
    toc: s.toc(),
    code: s.mdx(),
  }),
})

export default defineConfig({
  collections: { components },
})
