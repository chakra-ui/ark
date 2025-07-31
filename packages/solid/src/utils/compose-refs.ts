import { createEffect, createSignal, on } from 'solid-js'

type PossibleRef<T> = T | ((el: T) => void) | undefined

const isRefFn = <T>(ref: PossibleRef<T>): ref is (el: T | null) => void => typeof ref === 'function'

export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  const [node, setNode] = createSignal<T | null>(null)
  createEffect(
    on(node, (el) => {
      for (const ref of refs) {
        if (isRefFn(ref)) {
          ref(el)
        }
      }
    }),
  )
  return setNode
}
