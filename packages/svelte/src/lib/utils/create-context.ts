import { getContext, setContext } from 'svelte'

interface CreateContextOptions<T> {
  key?: string
}

type CreateContextReturn<T> = [(opts: T) => void, (fallback?: T) => T, symbol]

export const createContext = <T>(options: CreateContextOptions<T>) => {
  const { key } = options
  const contextId = Symbol(key)
  const provider = (value: T) => setContext(contextId, value)
  const consumer = () => getContext<T>(contextId)

  return [provider, consumer, contextId] as CreateContextReturn<T>
}
