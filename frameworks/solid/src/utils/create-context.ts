import {
  type Context,
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

export type CreateContextReturn<T> = [Context<T>['Provider'], () => T, Context<T>]

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    strict = true,
    hookName = 'useContext',
    providerName = 'Provider',
    errorMessage,
  } = options

  const Context = createSolidContext<T | undefined>(undefined)

  function useContext() {
    const context = useSolidContext(Context)

    if (!context && strict) {
      const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName))
      error.name = 'ContextError'
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>
}
