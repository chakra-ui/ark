import { fetchComponentList } from './fetch.js'

const cache = new Map<string, Promise<string[]>>()

const getComponentList = (framework: string) => {
  let list = cache.get(framework)
  if (!list) {
    list = fetchComponentList(framework).catch((error) => {
      cache.delete(framework)
      throw error
    })
    cache.set(framework, list)
  }
  return list
}

export const normalizeComponent = (name: string) =>
  name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()

export const resolveComponent = async (framework: string, name: string) => {
  const components = await getComponentList(framework)
  const component = normalizeComponent(name)
  if (components.includes(component)) return component

  const flat = component.replace(/-/g, '')
  const stem = component.split('-')[0]
  const suggestions = components
    .filter((c) => c.replace(/-/g, '') === flat || c.includes(stem) || component.includes(c))
    .slice(0, 5)
  const hint = suggestions.length ? ` Did you mean: ${suggestions.join(', ')}?` : ''
  throw new Error(`Unknown ${framework} component "${name}".${hint} Use list_components to see all names.`)
}

export const clearComponentCache = () => cache.clear()
