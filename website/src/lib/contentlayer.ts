import { allComponentDocuments, type ComponentDocument } from '@/contentlayer'

export const getComponentDocuments = () =>
  allComponentDocuments.sort((a, b) => a.name.localeCompare(b.name))

export const findComponentDocumentById = (id: string) =>
  getComponentDocuments().find((document) => document.id === id)

export const findPreviousComponentDocument = (document: ComponentDocument) => {
  const componentDocuments = getComponentDocuments()
  const index = componentDocuments.findIndex((entry) => entry.id === document.id)
  return componentDocuments[index - 1]
}

export const findNextComponentDocument = (document: ComponentDocument) => {
  const componentDocuments = getComponentDocuments()
  const index = componentDocuments.findIndex((entry) => entry.id === document.id)
  return componentDocuments[index + 1]
}
