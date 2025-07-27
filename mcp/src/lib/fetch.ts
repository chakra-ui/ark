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
