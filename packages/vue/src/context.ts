import { inject, provide } from 'vue'

type CreateContextReturn<T> = [(opts: T) => void, (fallback?: T) => T, symbol]

export const createContext = <T>(id: string) => {
  const contextId = Symbol(id)
  const provider = (value: T) => provide(contextId, value)
  const consumer = (): T | undefined => inject(contextId)

  return [provider, consumer, contextId] as CreateContextReturn<T>
}
