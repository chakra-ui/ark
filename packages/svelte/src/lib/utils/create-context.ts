import { getContext, hasContext, setContext } from 'svelte'

interface CreateContextOptions<T> {
  key?: string
  defaultValue?: T
}

type CreateContextReturn<T> = [(opts: T) => void, (fallback?: T) => T, symbol]

export const createContext = <T>(options: CreateContextOptions<T>) => {
  const { key } = options
  const contextId = Symbol(key)
  const provider = (value: T) => setContext(contextId, value)
  const consumer = () => (hasContext(contextId) ? getContext(contextId) : options.defaultValue)

  return [provider, consumer, contextId] as CreateContextReturn<T>
}
