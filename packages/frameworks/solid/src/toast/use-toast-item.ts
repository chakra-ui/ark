import { normalizeProps, useActor, type PropTypes } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { createMemo, type Accessor } from 'solid-js'

export type UseToastItemProps = { toast: toast.Service }
export type UseToastItemReturn = Accessor<toast.Api<PropTypes>>

export const useToastItem = (props: UseToastItemProps): UseToastItemReturn => {
  const [state, send] = useActor(props.toast)
  return createMemo(() => toast.connect(state, send, normalizeProps))
}
