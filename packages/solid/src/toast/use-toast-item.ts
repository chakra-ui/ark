import { normalizeProps, useActor } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { createMemo } from 'solid-js'

export type UseToastItemProps = { toast: toast.Service }
export type UseToastItemReturn = ReturnType<typeof useToastItem>

export const useToastItem = (props: UseToastItemProps) => {
  const [state, send] = useActor(props.toast)
  return createMemo(() => toast.connect(state, send, normalizeProps))
}
