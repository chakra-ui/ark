import { allComponentDocuments, allDocuments, type ComponentDocument } from '@/contentlayer'

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

export const getGeneralDocuments = (framework: string) => {
  const priority = ['introduction', 'getting-started', 'changelog']
  return allDocuments
    .filter((doc) => doc.framework === framework)
    .filter((doc) => !doc.hasOwnProperty('types'))
    .sort((a, b) => priority.indexOf(a.id) - priority.indexOf(b.id))
}

export const findDocumentByFrameWorkAndId = (framework: string, id: string) =>
  allDocuments.find((document) => document.id === id && document.framework === framework)
