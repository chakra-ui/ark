import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

const pages = defineCollection({
  name: 'Pages',
  pattern: ['docs/content/pages/**/*.mdx', 'frameworks/*/CHANGELOG.md'],
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
      framework: s.string().default('*'),
      toc: s.toc(),
      code: s.mdx(),
    })
    .transform((data, { meta }) => {
      if (data.id === 'changelog') {
        return {
          ...data,
          slug: 'overview/changelog',
          category: 'overview',
          framework: meta.path.replace(/.*\/frameworks\//, '').replace(/\/[^/]*$/, ''),
        }
      }
      return {
        ...data,
        slug: meta.path.replace(/.*\/pages\//, '').replace(/\.mdx$/, ''),
        category: meta.path.replace(/.*\/pages\//, '').replace(/\/[^/]*$/, ''),
      }
    }),
})

const types = defineCollection({
  name: 'Types',
  pattern: 'docs/content/types/**/*.json',
  schema: s
    .record(
      s.string(),
      s.record(
        s.string(),
        s.object({
          type: s.string(),
          isRequired: s.boolean(),
          defaultValue: s.string().optional(),
          description: s.string().optional(),
        }),
      ),
    )
    .transform((data, { meta }) => ({
      parts: data,
      component: meta.basename?.split('.')[0] ?? '',
      framework: meta.path.replace(/.*\/types\//, '').replace(/\/[^/]*$/, ''),
    })),
})

export default defineConfig({
  root: '../',
  collections: { pages, types },
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
