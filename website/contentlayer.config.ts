import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import fs from 'fs-extra'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

export const ComponentDocument = defineDocumentType(() => ({
  name: 'ComponentDocument',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    id: {
      type: 'string',
      description: 'The id of a component.',
      required: true,
    },
    name: {
      type: 'string',
      description: 'The name of a component',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of a component',
      required: true,
    },
  },
  computedFields: {
    route: {
      type: 'string',
      // TODO add support for solid and vue
      resolve: (doc) => '/docs/react/components/' + doc.id,
    },
    types: {
      type: 'json',
      resolve: (doc) => {
        return fs.readJSONSync(`../packages/react/src/${doc.id}/docs/${doc.id}.types.json`)
      },
    },
  },
}))

export default makeSource({
  contentDirPath: '../packages/react/src',
  documentTypes: [ComponentDocument],
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
