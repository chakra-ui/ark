import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { parse } from 'path'

export const ComponentDocument = defineDocumentType(() => ({
  name: 'ComponentDocument',
  filePathPattern: '**/*.mdx',
  computedFields: {
    name: {
      type: 'string',
      resolve: (doc) => parse(doc._raw.sourceFileName).name,
    },
  },
}))

export default makeSource({
  contentDirPath: '../packages/react/src',
  documentTypes: [ComponentDocument],
  disableImportAliasWarning: true,
})
