type WaitForEventReturn<K extends keyof HTMLElementEventMap> = [Promise<HTMLElementEventMap[K]>, VoidFunction]

export interface WaitForEventOptions<T extends HTMLElement = HTMLElement> extends AddEventListenerOptions {
  predicate?: (element: T) => boolean
}

export function waitForEvent<
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap,
>(target: (() => HTMLElement | null) | undefined, event: K, options?: WaitForEventOptions<T>): WaitForEventReturn<K> {
  let cleanup: VoidFunction | undefined
  const { predicate, ...listenerOptions } = options ?? {}

  const promise = new Promise<HTMLElementEventMap[K]>((resolve) => {
    const element = target?.()
    if (!element) {
      return
    }

    const handler = (e: HTMLElementEventMap[K]) => {
      if (!predicate || predicate(element as T)) {
        resolve(e)
        cleanup?.()
      }
    }

    element.addEventListener(event, handler, listenerOptions)
    cleanup = () => element.removeEventListener(event, handler, listenerOptions)
  })

  return [promise, () => cleanup?.()]
}
