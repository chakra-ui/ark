import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UsePopoverProps = Optional<popover.Context, 'id'>

export const usePopover = (props: UsePopoverProps) => {
  const context = {
    id: createUniqueId(),
    ...props,
  }

  const [state, send] = useMachine(popover.machine(context), { context })
  return createMemo(() => popover.connect(state, send, normalizeProps))
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
