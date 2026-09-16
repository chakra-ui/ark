import { getFramework } from './frameworks'

export const getLatestVersion = async (): Promise<string> => {
  const framework = await getFramework()
  const response = await fetch(`https://registry.npmjs.org/@ark-ui/${framework}/latest`, {
    next: { revalidate: 3600 },
  })
  const data = await response.json()
  return data.version as string
}
