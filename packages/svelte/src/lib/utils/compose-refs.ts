import { createAttachmentKey } from 'svelte/attachments'

type RefSetter<T> = (v: T) => void

export function composeRefs<T extends EventTarget = Element>(...refs: RefSetter<T | null>[]) {
  return {
    [createAttachmentKey()]: (node: T) => {
      for (const ref of refs) {
        ref(node)
      }
      return () => {
        for (const ref of refs) {
          ref(null)
        }
      }
    },
  }
}
