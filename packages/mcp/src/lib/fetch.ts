import type {
  GetComponentPropsResponse,
  GetDocsResponse,
  GetExampleResponse,
  GetStyleGuideResponse,
  ListComponentExamplesResponse,
  ListDocsResponse,
  ListExamplesResponse,
  SearchDocsResponse,
} from './types.js'

const API_BASE = 'https://ark-ui.com/api'

const fetchJson = async <T>(path: string, label: string): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${label}: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const fetchComponentList = (framework: string) => fetchJson<string[]>(`/types/${framework}`, 'component list')

export const listExamples = (framework: string) => fetchJson<ListExamplesResponse>(`/examples/${framework}`, 'examples')

export const listComponentExamples = async ({ framework, component }: { framework: string; component: string }) => {
  const data = await fetchJson<ListComponentExamplesResponse>(`/examples/${framework}/${component}`, 'examples')
  return data.examples.map((example) => example.id)
}

export const getExample = ({
  framework,
  component,
  exampleId,
}: {
  framework: string
  component: string
  exampleId: string
}) => fetchJson<GetExampleResponse>(`/examples/${framework}/${component}/${exampleId}`, 'example')

export const getStyleGuide = (component: string) =>
  fetchJson<GetStyleGuideResponse>(`/style-guide/${component}`, 'style guide')

export const getComponentProps = async ({
  framework,
  component,
}: {
  framework: string
  component: string
}): Promise<GetComponentPropsResponse> => {
  const props = await fetchJson<Record<string, unknown>>(`/types/${framework}/${component}`, 'component props')

  return {
    framework,
    component,
    props,
  }
}

export const listDocs = () => fetchJson<ListDocsResponse>('/docs', 'docs list')

export const searchDocs = (query: string) =>
  fetchJson<SearchDocsResponse>(`/docs?q=${encodeURIComponent(query)}`, 'docs search')

export const getDocs = (slug: string) => fetchJson<GetDocsResponse>(`/docs/${slug}`, 'docs page')
