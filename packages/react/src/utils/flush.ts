import { flushSync } from 'react-dom'

export const flush = (fn: VoidFunction) => {
  queueMicrotask(() => {
    flushSync(fn)
  })
}
