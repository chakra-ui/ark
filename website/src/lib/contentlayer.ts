import { allComponentDocuments, allDocuments, type DocumentTypes } from '@/contentlayer'

export const getComponentDocuments = (framework: string) =>
  allComponentDocuments
    .filter((doc) => doc.framework === framework)
    .sort((a, b) => a.name.localeCompare(b.name))

export const findComponentDocumentByFrameworkAndId = (framework: string, id: string) =>
  getComponentDocuments(framework).find(
    (document) => document.id === id && document.framework === framework,
  )

export const findDocumentsByFramework = (framework: string) => [
  ...getGeneralDocuments(framework),
  ...getComponentDocuments(framework),
]

export const findNextDocument = (document: DocumentTypes) => {
  const docs = findDocumentsByFramework(document.framework)
  const index = docs.findIndex((entry) => entry.id === document.id)
  return docs[index + 1]
}

export const findPrevDocument = (document: DocumentTypes) => {
  const docs = findDocumentsByFramework(document.framework)
  const index = docs.findIndex((entry) => entry.id === document.id)
  return docs[index - 1]
}

export const getGeneralDocuments = (framework: string) => {
  const priority = [
    'introduction',
    'getting-started',
    'as-child-prop',
    'styling',
    'custom-components',
    'changelog',
  ]
  return allDocuments
    .filter((doc) => doc.framework === framework)
    .filter((doc) => !doc.hasOwnProperty('types'))
    .sort((a, b) => priority.indexOf(a.id) - priority.indexOf(b.id))
}

export const findDocumentByFrameWorkAndId = (framework: string, id: string) =>
  allDocuments.find((document) => document.id === id && document.framework === framework)
