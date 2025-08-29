import type {
  GetExampleResponse,
  GetStyleGuideResponse,
  ListComponentExamplesResponse,
  ListExamplesResponse,
} from './types.js'

/**
 * Fetches the list of all available Ark UI components for a specific framework.
 */
export async function fetchComponentList(framework: string): Promise<string[]> {
  const response = await fetch(`https://ark-ui.com/api/types/${framework}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch component list: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<string[]>
}

export async function listExamples(framework: string): Promise<ListExamplesResponse> {
  const response = await fetch(`https://ark-ui.com/api/examples/${framework}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch examples: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<ListExamplesResponse>
}

export async function listComponentExamples({
  framework,
  component,
}: {
  framework: string
  component: string
}): Promise<string[]> {
  const response = await fetch(`https://ark-ui.com/api/examples/${framework}/${component}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch examples: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as ListComponentExamplesResponse

  const examples = data.examples.map((example) => example.id)

  return examples
}

export async function getExample({
  framework,
  component,
  exampleId,
}: {
  framework: string
  component: string
  exampleId: string
}): Promise<GetExampleResponse> {
  const response = await fetch(`https://ark-ui.com/api/examples/${framework}/${component}/${exampleId}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch examples: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<GetExampleResponse>
}

export async function getStyleGuide(component: string): Promise<GetStyleGuideResponse> {
  const response = await fetch(`https://ark-ui.com/api/style-guide/${component}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch examples: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<GetStyleGuideResponse>
}
