import { getContext, hasContext, setContext } from 'svelte'

interface CreateContextOptions<T> {
  name?: string
  defaultValue?: T
  strict?: boolean
  hookName?: string
  providerName?: string
  errorMessage?: string
}

type CreateContextReturn<T> = [(opts: T) => void, (fallback?: T) => T, symbol]

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

export const createContext = <T>(options: CreateContextOptions<T>) => {
  const {
    name,
    strict = true,
    hookName = 'useContext',
    providerName = 'Provider',
    errorMessage,
    defaultValue,
  } = options

  const contextId = Symbol(name)

  const provider = (value: T) => setContext(contextId, value)

  const consumer = () => {
    const exists = hasContext(contextId)
    if (strict && !exists) throw new Error(errorMessage ?? getErrorMessage(hookName, providerName))
    return exists ? getContext(contextId) : defaultValue
  }

  return [provider, consumer, contextId] as CreateContextReturn<T>
}
