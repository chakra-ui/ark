type PossibleRef<T> = T | ((el: T) => void) | undefined

const isRefFn = <T>(ref: PossibleRef<T>): ref is (el: T) => void => typeof ref === 'function'

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (isRefFn(ref)) {
    ref(value)
  }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => {
    for (const ref of refs) {
      setRef(ref, node)
    }
  }
}
