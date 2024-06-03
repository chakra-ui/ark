import { inject, provide } from 'vue'

type CreateContextReturn<T> = [(opts: T) => void, (fallback?: T) => T, symbol]

interface CreateContextOptions<T> {
  strict?: boolean
  hookName?: string
  providerName?: string
  errorMessage?: string
  defaultValue?: T
}

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

export const createContext = <T>(name: string, options: CreateContextOptions<T> = {}) => {
  const {
    defaultValue,
    strict = true,
    hookName = 'useContext',
    providerName = 'Provider',
    errorMessage,
  } = options

  const Context = Symbol(name)

  const provider = (value: T) => provide(Context, value)

  const consumer = (fallback?: T) => {
    const context = inject(Context, fallback || defaultValue)

    if (!context && strict) {
      const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName))
      error.name = 'ContextError'
      Error.captureStackTrace?.(error, consumer)
      throw error
    }

    return context
  }

  return [provider, consumer, Context] as CreateContextReturn<T>
}
