import {
  allChangelogDocuments,
  allComponentDocuments,
  type ComponentDocument,
} from '@/contentlayer'

export const getComponentDocuments = (framework: string) =>
  allComponentDocuments
    .filter((doc) => doc.framework === framework)
    .sort((a, b) => a.name.localeCompare(b.name))

export const findComponentDocumentByFrameworkAndId = (framework: string, id: string) =>
  getComponentDocuments(framework).find(
    (document) => document.id === id && document.framework === framework,
  )

export const findPreviousComponentDocument = (document: ComponentDocument) => {
  const componentDocuments = getComponentDocuments(document.framework)
  const index = componentDocuments.findIndex((entry) => entry.id === document.id)
  return componentDocuments[index - 1]
}

export const findNextComponentDocument = (document: ComponentDocument) => {
  const componentDocuments = getComponentDocuments(document.framework)
  const index = componentDocuments.findIndex((entry) => entry.id === document.id)
  return componentDocuments[index + 1]
}

export const getChangelogDocuments = () => allChangelogDocuments

export const findChangelogDocumentByFramework = (framework: string) =>
  getChangelogDocuments().find((document) => document.framework === framework)
