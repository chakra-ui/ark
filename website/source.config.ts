import rehypeShiki from '@shikijs/rehype'
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { defineConfig } from 'fumadocs-mdx/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkRemoveFirstHeading from './src/lib/remark-remove-first-heading'

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
