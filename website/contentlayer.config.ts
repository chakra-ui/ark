import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const ComponentDocument = defineDocumentType(() => ({
  name: 'ComponentDocument',
  filePathPattern: '**/*.mdx',
}))

export default makeSource({
  contentDirPath: '../packages/react/src',
  documentTypes: [ComponentDocument],
})
