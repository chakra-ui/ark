import { createEffect } from 'solid-js'

type PossibleRef<T> = T | ((el: T) => void) | undefined

const isRefFn = <T>(ref: PossibleRef<T>): ref is (el: T | null) => void => typeof ref === 'function'

const setRefs = <T>(refs: PossibleRef<T>[], node: T | null) => {
  for (const ref of refs) {
    if (isRefFn(ref)) {
      ref(node)
    }
  }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  let node: T | null = null
  createEffect(() => {
    setRefs(refs, node)
  })
  return (el: T) => {
    node = el
    setRefs(refs, el)
  }
}
