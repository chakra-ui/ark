import rehypeShiki from '@shikijs/rehype'
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { defineCollections, defineConfig } from 'fumadocs-mdx/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { z } from 'zod'
import remarkRemoveFirstHeading from './src/lib/remark-remove-first-heading'

export const pages = defineCollections({
  type: 'doc',
  dir: 'src/content/pages',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
  }),
})

export const blog = defineCollections({
  type: 'doc',
  dir: 'src/content/blog',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    author: z.union([z.string(), z.array(z.string())]).optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    type: z.enum(['article', 'release']).optional(),
  }),
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: false,
    remarkImageOptions: false,
    remarkNpmOptions: false,
    remarkCodeTabOptions: false,
    remarkPlugins: (v) => [...v, remarkRemoveFirstHeading],
    rehypePlugins: (v) => [
      [
        rehypeShiki,
        {
          theme: 'github-dark-default',
          transformers: [
            transformerNotationDiff(),
            transformerNotationFocus(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
            transformerMetaHighlight(),
            transformerMetaWordHighlight(),
          ],
        },
      ],
      ...v,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['subheading-anchor'], 'aria-label': 'Link to this section' },
        },
      ],
    ],
  },
})
