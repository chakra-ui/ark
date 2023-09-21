import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UsePopoverProps extends Optional<popover.Context, 'id'> {
  /**
   * The initial open state of the popover.
   */
  defaultOpen?: popover.Context['open']
}

export interface UsePopoverReturn extends popover.Api<PropTypes> {}

export const usePopover = (props: UsePopoverProps = {}): UsePopoverReturn => {
  const initialContext: popover.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    open: props.defaultOpen ?? props.open,
  }

  const context: popover.Context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
  }

  const [state, send] = useMachine(popover.machine(context), { context })
  return popover.connect(state, send, normalizeProps)
}
