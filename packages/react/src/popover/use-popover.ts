import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UsePopoverProps = Omit<popover.Context, 'id'>

export const usePopover = (props: UsePopoverProps) => {
  const [state, send] = useMachine(
    popover.machine({
      id: useId(),
      ...props,
    }),
  )
  const api = popover.connect(state, send, normalizeProps)
  return { api }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
