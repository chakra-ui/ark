type WaitForEventReturn<K extends keyof HTMLElementEventMap> = [Promise<HTMLElementEventMap[K]>, VoidFunction]

export interface WaitForEventOptions<T extends HTMLElement = HTMLElement> extends AddEventListenerOptions {
  predicate?: (element: T) => boolean
}

export function waitForEvent<
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap,
>(target: (() => HTMLElement | null) | undefined, event: K, options?: WaitForEventOptions<T>): WaitForEventReturn<K> {
  let cleanup: VoidFunction | undefined
  let retry: ReturnType<typeof setTimeout> | undefined
  let cancelled = false
  const { predicate, ...listenerOptions } = options ?? {}

  const promise = new Promise<HTMLElementEventMap[K]>((resolve) => {
    const attach = () => {
      if (cancelled) return

      const element = target?.()
      if (!element) {
        retry = setTimeout(attach, 16)
        return
      }

      const handler = (e: HTMLElementEventMap[K]) => {
        if (!predicate || predicate(element as T)) {
          resolve(e)
          cleanup?.()
        }
      }

      element.addEventListener(event, handler, listenerOptions)
      cleanup = () => {
        element.removeEventListener(event, handler, listenerOptions)
        if (retry !== undefined) clearTimeout(retry)
      }
    }

    attach()
  })

  return [
    promise,
    () => {
      cancelled = true
      cleanup?.()
      if (retry !== undefined) clearTimeout(retry)
    },
  ]
}
