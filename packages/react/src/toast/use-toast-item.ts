import { normalizeProps, useActor } from '@zag-js/react'
import * as toast from '@zag-js/toast'

export type UseToastItemProps = { toast: toast.Service }
export type UseToastItemReturn = ReturnType<typeof useToastItem>

export const useToastItem = (props: UseToastItemProps) => {
  const [state, send] = useActor(props.toast)
  return toast.connect(state, send, normalizeProps)
}
