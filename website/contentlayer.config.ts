import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { startCase } from 'lodash-es'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

export const ComponentDocument = defineDocumentType(() => ({
  name: 'ComponentDocument',
  filePathPattern: 'packages/*/src/**.mdx',
  contentType: 'mdx',
  computedFields: {
    name: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    title: {
      type: 'string',
      resolve: (doc) => startCase(doc._raw.sourceFileName.replace(/\.mdx$/, '')),
    },
    url: {
      type: 'string',
      // TODO add support for solid and vue
      resolve: (doc) => '/docs/react/components/' + doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export const StyleguideDocument = defineDocumentType(() => ({
  name: 'StyleguideDocument',
  filePathPattern: 'styleguides/*.mdx',
  contentType: 'markdown',
}))

export default makeSource({
  contentDirPath: '..',
  contentDirInclude: ['styleguides'],
  documentTypes: [StyleguideDocument, ComponentDocument],
  disableImportAliasWarning: true,
  mdx: {
    rehypePlugins: [
      [
        rehypePrism,
        rehypeSlug,
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3', 'h4'],
          properties: { className: ['anchor'] },
        },
      ],
    ],
  },
})
