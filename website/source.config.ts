import { defineCollections, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config'
import { z } from 'zod'
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { replaceComponentTypes, replaceContextType, replaceExample } from '~/lib/mdx-transform'

export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'src/content/blog',
  schema: frontmatterSchema.extend({
    description: z.string(),
    date: z
      .string()
      .refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid date string')
      .transform<string>((value) => new Date(value).toISOString()),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
})

export const pages = defineCollections({
  type: 'doc',
  dir: 'src/content/pages',
  postprocess: {
    includeProcessedMarkdown: true,
  },
  schema: (ctx) => {
    const fileName = ctx.path.match(/\/([^/]+)\.mdx$/)?.[1] ?? ''
    const category = ctx.path.match(/\/pages\/([^/]+)\//)?.[1] ?? ''

    return frontmatterSchema.extend({
      id: z.string().default(fileName),
      description: z.string(),
      subtitle: z.string().optional(),
      category: z.string().default(category),
      status: z.string().optional(),
      llm: z.custom<string>().transform(() => {
        let processed = replaceExample(ctx.source, fileName)
        processed = replaceComponentTypes(processed)
        processed = replaceContextType(processed)
        return processed
      }),
    })
  },
})

const PropDefinition = z.object({
  type: z.string(),
  isRequired: z.boolean(),
  defaultValue: z.string().optional(),
  description: z.string().optional(),
})

export const types = defineCollections({
  type: 'meta',
  dir: 'src/content/types',
  schema: (ctx) =>
    z
      .record(
        z.string(),
        z.object({
          props: z.record(z.string(), PropDefinition),
          element: z.string().optional(),
          tag: z.string().optional(),
          emits: z.record(z.string(), PropDefinition).optional(),
        }),
      )
      .transform((data) => ({
        parts: data,
        component: ctx.path.match(/\/([^/]+)\.types\.json$/)?.[1] ?? '',
        framework: ctx.path.match(/\/types\/([^/]+)\/[^/]+\.types\.json$/)?.[1] ?? '',
      })),
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      defaultColor: 'dark',
      transformers: [
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
      ],
    },
    rehypePlugins: (v) => [
      ...v,
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
