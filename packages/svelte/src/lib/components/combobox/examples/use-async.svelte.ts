import { onMount } from 'svelte'

export function useAsync<T>(fn: () => (signal: AbortSignal | null) => Promise<T>) {
  let loading = $state(false)
  let error = $state<Error | null>(null)

  let controller: AbortController | null = null
  const abort = () => {
    controller?.abort()
  }

  const load = async () => {
    loading = true
    error = null

    abort()
    controller = new AbortController()

    try {
      const data = await fn()(controller.signal)
      return data
    } catch (err) {
      error = err instanceof Error ? err : new Error(String(err))
    } finally {
      loading = false
    }
  }

  onMount(() => {
    void load()

    return () => {
      abort()
    }
  })

  return {
    loading() {
      return loading
    },
    error() {
      return error
    },
    load,
  }
}
