import { type Framework, frameworks } from './frameworks'

const FALLBACK_VERSION = 'latest'

const fetchVersion = async (framework: Framework): Promise<string> => {
  try {
    const response = await fetch(`https://registry.npmjs.org/@ark-ui/${framework}/latest`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) return FALLBACK_VERSION
    const data = await response.json()
    return (data.version as string) ?? FALLBACK_VERSION
  } catch {
    return FALLBACK_VERSION
  }
}

export const getLatestVersions = async (): Promise<Record<Framework, string>> => {
  const entries = await Promise.all(
    frameworks.map(async (framework) => [framework, await fetchVersion(framework)] as const),
  )
  return Object.fromEntries(entries) as Record<Framework, string>
}
