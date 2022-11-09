import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UsePopoverProps = Omit<popover.Context, 'id'>

export const usePopover = (props: UsePopoverProps) => {
  const context = {
    id: useId(),
    ...props,
  }

  const [state, send] = useMachine(popover.machine(context), { context })
  return popover.connect(state, send, normalizeProps)
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
