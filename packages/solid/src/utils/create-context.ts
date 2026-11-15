import { hasProp, isFunction } from '@zag-js/utils'
import {
  type Context,
  type ContextProviderComponent,
  createContext as createSolidContext,
  useContext as useSolidContext,
} from 'solid-js'

export interface CreateContextOptions<T> {
  strict?: boolean
  hookName?: string
  providerName?: string
  errorMessage?: string
  defaultValue?: T
}

export type CreateContextReturn<T> = [ContextProviderComponent<T>, () => T, Context<T>]

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  const { strict = true, hookName = 'useContext', providerName = 'Provider', errorMessage, defaultValue } = options

  // Solid 2 throws on a missing provider unless the context has a default; `null` keeps the lookup soft
  const Context = createSolidContext<T | null>(defaultValue ?? null)

  function useContext() {
    const context = useSolidContext(Context) ?? undefined

    if (!context && strict) {
      const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName))
      error.name = 'ContextError'
      if (hasProp(Error, 'captureStackTrace') && isFunction(Error.captureStackTrace)) {
        Error.captureStackTrace(error, useContext)
      }
      throw error
    }

    return context
  }

  return [Context, useContext, Context] as unknown as CreateContextReturn<T>
}
