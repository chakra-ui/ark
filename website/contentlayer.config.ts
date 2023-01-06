import type { RawDocumentData } from 'contentlayer/core'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import fs from 'fs-extra'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

const resolveFramework = (doc: { _raw: RawDocumentData }) => doc._raw.sourceFilePath.split('/')[0]
export const ComponentDocument = defineDocumentType(() => ({
  name: 'ComponentDocument',
  filePathPattern: '*/src/**/docs/*.mdx',
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
    framework: {
      type: 'string',
      resolve: resolveFramework,
    },
    route: {
      type: 'string',
      resolve: (doc) => {
        const framework = resolveFramework(doc)
        return `/docs/${framework}/components/${doc.id}`
      },
    },
    types: {
      type: 'json',
      resolve: (doc) => {
        const framework = resolveFramework(doc)
        return fs.readJSONSync(`../packages/${framework}/src/${doc.id}/docs/${doc.id}.types.json`)
      },
    },
  },
}))

export const ChangelogDocument = defineDocumentType(() => ({
  name: 'ChangelogDocument',
  filePathPattern: '*/CHANGELOG.md',
  contentType: 'mdx',
  computedFields: {
    framework: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath.split('/')[0],
    },
  },
}))

export default makeSource({
  contentDirPath: '../packages',
  contentDirInclude: [
    'react',
    //'solid',
    //'vue',
  ],
  contentDirExclude: ['*/node_modules', 'dist'],
  documentTypes: [ComponentDocument, ChangelogDocument],
  disableImportAliasWarning: true,
  onUnknownDocuments: 'skip-ignore',
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
