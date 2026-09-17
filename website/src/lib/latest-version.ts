import { defaultFramework } from './frameworks'

export const getLatestVersion = async (): Promise<string> => {
  const response = await fetch(`https://registry.npmjs.org/@ark-ui/${defaultFramework}/latest`, {
    next: { revalidate: 3600 },
  })
  const data = await response.json()
  return data.version as string
}
