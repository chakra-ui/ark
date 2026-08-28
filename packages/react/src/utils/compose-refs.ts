import { useCallback } from 'react'
import type { Ref, RefCallback } from 'react'

type PossibleRef<T> = Ref<T | null> | undefined

export function composeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (node) => {
    const cleanUps: VoidFunction[] = []
    let hasCustomCleanUp = false

    for (const ref of refs) {
      if (typeof ref === 'function') {
        const cb = ref(node)
        if (typeof cb === 'function') {
          hasCustomCleanUp = true
          cleanUps.push(cb)
        } else {
          cleanUps.push(() => ref(null))
        }
      } else if (ref) {
        ref.current = node
        cleanUps.push(() => {
          ref.current = null
        })
      }
    }

    if (hasCustomCleanUp) {
      return () => {
        for (const cleanUp of cleanUps) {
          cleanUp()
        }
      }
    }
  }
}

export function useComposedRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  // biome-ignore lint/correctness/useExhaustiveDependencies: refs is the dependency list for the composed callback
  return useCallback(composeRefs(...refs), refs)
}
