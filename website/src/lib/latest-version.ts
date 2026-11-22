import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { cacheLife } from 'next/cache'
import { type Framework, frameworks } from './frameworks'

const FALLBACK_VERSION = 'latest'

const readLocalVersion = async (framework: Framework): Promise<string> => {
  try {
    const pkg = JSON.parse(await readFile(join(process.cwd(), '..', 'packages', framework, 'package.json'), 'utf-8'))
    return (pkg.version as string) ?? FALLBACK_VERSION
  } catch {
    return FALLBACK_VERSION
  }
}

const fetchVersion = async (framework: Framework): Promise<string> => {
  'use cache'
  cacheLife('hours')
  try {
    const response = await fetch(`https://registry.npmjs.org/@ark-ui/${framework}/latest`, {
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) return readLocalVersion(framework)
    const data = await response.json()
    return (data.version as string) ?? FALLBACK_VERSION
  } catch {
    return readLocalVersion(framework)
  }
}

export const getLatestVersions = async (): Promise<Record<Framework, string>> => {
  const entries = await Promise.all(
    frameworks.map(async (framework) => [framework, await fetchVersion(framework)] as const),
  )
  return Object.fromEntries(entries) as Record<Framework, string>
}
