/* eslint-disable no-unused-vars */

import { inject, provide } from 'vue'

type CreateContextReturn<T> = [(opts: T) => void, (fallback?: T) => T, symbol]

export const createContext = <T>(id: string) => {
  const contextId = Symbol(id)
  const provider = (value: T) => provide(contextId, value)
  const consumer = (fallback?: T) => inject(contextId, fallback)

  return [provider, consumer, contextId] as CreateContextReturn<T>
}
