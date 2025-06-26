import { createSignal, onCleanup, onMount } from 'solid-js'

export function useAsync<T>(fn: (signal: AbortSignal | null) => Promise<T>) {
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  let controller: AbortController | null = null
  const abort = () => {
    controller?.abort()
  }

  const load = async () => {
    setLoading(true)
    setError(null)

    abort()
    controller = new AbortController()

    try {
      const data = await fn(controller.signal)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setLoading(false)
    }
  }

  onMount(() => {
    void load()
  })

  onCleanup(() => {
    abort()
  })

  return {
    loading,
    error,
    load,
  }
}
