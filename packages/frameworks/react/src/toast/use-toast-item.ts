import { normalizeProps, useActor, type PropTypes } from '@zag-js/react'
import * as toast from '@zag-js/toast'

export interface UseToastItemProps {
  toast: toast.Service
}

export interface UseToastItemReturn extends toast.Api<PropTypes> {}

export const useToastItem = (props: UseToastItemProps): UseToastItemReturn => {
  const [state, send] = useActor(props.toast)
  return toast.connect(state, send, normalizeProps)
}
