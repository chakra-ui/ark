import rehypeShiki from '@shikijs/rehype'
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { join } from 'node:path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'
import { replaceComponentTypes, replaceContextType, replaceExample } from './src/lib/mdx-transform'

const pages = defineCollection({
  name: 'Pages',
  pattern: ['pages/**/*.mdx', '../../../packages/*/CHANGELOG.md'],
  schema: s
    .object({
      // TODO create a changelog collection instead
      id: s.string().default('changelog'),
      title: s.string().default('Changelog'),
      subtitle: s.string().optional(),
      description: s.string().default('All notable changes will be documented in this file.'),
      metadata: s.metadata(),
      content: s.markdown(),
      framework: s.string().default('*'),
      status: s.string().optional(),
      toc: s.toc(),
      code: s.mdx(),
      llm: s.custom<string>().transform((_data, { meta }) => {
        const content = meta.content as string
        const path = meta.path as string
        const isChangelog = path.includes('CHANGELOG.md')
        const component = isChangelog
          ? ''
          : path
              .split('/')
              .pop()
              ?.replace(/\.mdx$/, '') || ''
        let processed = replaceExample(content, component)
        processed = replaceComponentTypes(processed)
        processed = replaceContextType(processed)
        return processed
      }),
    })
    .transform((data, { meta }) => {
      if (data.id === 'changelog') {
        return {
          ...data,
          slug: 'overview/changelog',
          category: 'overview',
          framework: (meta.path as string).replace(/.*\/packages\//, '').replace(/\/[^/]*$/, ''),
          toc: data.toc.map((entry) => ({ ...entry, items: [] })),
        }
      }
      return {
        ...data,
        slug: (meta.path as string).replace(/.*\/pages\//, '').replace(/\.mdx$/, ''),
        category: (meta.path as string).replace(/.*\/pages\//, '').replace(/\/[^/]*$/, ''),
      }
    }),
})

const blogs = defineCollection({
  name: 'Blogs',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      date: s.isodate(),
      author: s.string().optional(),
      tags: s.array(s.string()).optional(),
      image: s.string().optional(),
      metadata: s.metadata(),
      content: s.markdown(),
      toc: s.toc(),
      code: s.mdx(),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: (meta.path as string).replace(/.*\/blog\//, '').replace(/\.mdx$/, ''),
      category: 'blog',
    })),
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
      component: (meta.basename as string)?.split('.')[0] ?? '',
      framework: (meta.path as string).replace(/.*\/types\//, '').replace(/\/[^/]*$/, ''),
    })),
})

export default defineConfig({
  root: join(process.cwd(), './src/content'),
  collections: { pages, blogs, types, showcases },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeShiki,
        {
          transformers: [
            transformerNotationDiff(),
            transformerNotationFocus(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
            transformerMetaHighlight(),
            transformerMetaWordHighlight(),
          ],
          theme: 'github-dark-default',
        },
      ],
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
