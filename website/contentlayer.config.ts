import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { startCase } from 'lodash-es'

export const ComponentDocument = defineDocumentType(() => ({
  name: 'ComponentDocument',
  filePathPattern: '**/*.mdx',
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

export default makeSource({
  contentDirPath: '../packages/react/src',
  documentTypes: [ComponentDocument],
  disableImportAliasWarning: true,
})
