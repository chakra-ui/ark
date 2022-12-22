import { allComponentDocuments, type ComponentDocument } from '@/contentlayer'

export const getComponentDocuments = () =>
  allComponentDocuments.sort((a, b) => a.title.localeCompare(b.title))

export const findComponentDocumentByName = (name: string) =>
  getComponentDocuments().find((document) => document.name === name)

export const findPreviousComponentDocument = (document: ComponentDocument) => {
  const componentDocuments = getComponentDocuments()
  const index = componentDocuments.findIndex((entry) => entry.name === document.name)
  return componentDocuments[index - 1]
}

export const findNextComponentDocument = (document: ComponentDocument) => {
  const componentDocuments = getComponentDocuments()
  const index = componentDocuments.findIndex((entry) => entry.name === document.name)
  return componentDocuments[index + 1]
}
