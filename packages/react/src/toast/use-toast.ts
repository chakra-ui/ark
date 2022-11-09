import { normalizeProps, useMachine } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { useId } from 'react'

export type UseToastReturn = ReturnType<typeof useToast>

export const useToast = () => {
  const [state, send] = useMachine(toast.group.machine({ id: useId() }))
  return toast.group.connect(state, send, normalizeProps)
}
