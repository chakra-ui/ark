import { join } from 'node:path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

const pages = defineCollection({
  name: 'Pages',
  pattern: ['pages/**/*.mdx', '../../../packages/*/CHANGELOG.md'],
  schema: s
    .object({
      id: s.string(),
      title: s.string(),
      description: s.string(),
      metadata: s.metadata(),
      content: s.markdown(),
      framework: s.string().default('*'),
      status: s.string().optional(),
      toc: s.toc(),
      code: s.mdx(),
    })
    .transform((data, { meta }) => {
      if (data.id === 'changelog') {
        return {
          ...data,
          slug: 'overview/changelog',
          category: 'overview',
          framework: meta.path.replace(/.*\/packages\//, '').replace(/\/[^/]*$/, ''),
          toc: data.toc.map((entry) => ({ ...entry, items: [] })),
        }
      }
      return {
        ...data,
        slug: meta.path.replace(/.*\/pages\//, '').replace(/\.mdx$/, ''),
        category: meta.path.replace(/.*\/pages\//, '').replace(/\/[^/]*$/, ''),
      }
    }),
})

const showcases = defineCollection({
  name: 'Showcases',
  pattern: 'showcases.json',
  schema: s.object({
    title: s.string(),
    description: s.string(),
    url: s.string(),
    image: s.string(),
  }),
})

const PropDefintion = s.object({
  type: s.string(),
  isRequired: s.boolean(),
  defaultValue: s.string().optional(),
  description: s.string().optional(),
})

const types = defineCollection({
  name: 'Types',
  pattern: 'types/**/*.json',
  schema: s
    .record(
      s.string(),
      s.object({
        props: s.record(s.string(), PropDefintion),
        element: s.string().optional(),
        tag: s.string().optional(),
        emits: s.record(s.string(), PropDefintion).optional(),
      }),
    )
    .transform((data, { meta }) => ({
      parts: data,
      component: meta.basename?.split('.')[0] ?? '',
      framework: meta.path.replace(/.*\/types\//, '').replace(/\/[^/]*$/, ''),
    })),
})

export default defineConfig({
  root: join(process.cwd(), './src/content'),
  collections: { pages, types, showcases },
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
