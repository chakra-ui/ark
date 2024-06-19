import { getContext, setContext } from 'svelte'

type CreateContextReturn<T> = [(opts: T) => void, (fallback?: T) => T, symbol]

export const createContext = <T>(id: string) => {
  const contextId = Symbol(id)
  const provider = (value: T) => setContext(contextId, value)
  const consumer = () => getContext(contextId)

  return [provider, consumer, contextId] as CreateContextReturn<T>
}
