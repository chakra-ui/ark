import {
  allComponentDocuments,
  allStyleguideDocuments,
  type ComponentDocument,
} from '@/contentlayer'

console.log(
  'Component',
  allComponentDocuments.map((doc) => doc._raw.sourceFilePath),
)
console.log(
  'Styleguide',
  allStyleguideDocuments.map((doc) => doc._raw.sourceFilePath),
)
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

export const getStyleguideDocuments = () =>
  allStyleguideDocuments.sort((a, b) => a.title.localeCompare(b.title))
export const findComponentStyleguideByName = (name: string) =>
  getStyleguideDocuments().find((document) => document.name === name)
