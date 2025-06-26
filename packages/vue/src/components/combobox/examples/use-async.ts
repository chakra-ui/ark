import { type ComputedRef, onMounted, onUnmounted, ref } from 'vue'

type AsyncFn<T> = (signal: AbortSignal | null) => Promise<T>

export function useAsync<T>(fn: ComputedRef<AsyncFn<T>>) {
  const loading = ref(false)
  const error = ref<Error | null>(null)

  let controller: AbortController | null = null
  const abort = () => {
    controller?.abort()
  }

  const load = async () => {
    loading.value = true
    error.value = null

    abort()
    controller = new AbortController()

    try {
      const data = await fn.value(controller.signal)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    void load()
  })

  onUnmounted(() => {
    abort()
  })

  return {
    loading,
    error,
    load,
  }
}
