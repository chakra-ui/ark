import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

const pages = defineCollection({
  name: 'Pages',
  pattern: 'pages/**/*.mdx',
  schema: s
    .object({
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
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: meta.path.replace(/.*\/pages\//, '').replace(/\.mdx$/, ''),
      category: meta.path.replace(/.*\/pages\//, '').replace(/\/[^/]*$/, ''),
    })),
})

export default defineConfig({
  collections: { pages },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
})
