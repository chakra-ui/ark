import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UsePopoverProps
  extends Optional<Omit<popover.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the popover when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: popover.Context['open']
}

export interface UsePopoverReturn extends popover.Api<PropTypes> {}

export const usePopover = (props: UsePopoverProps = {}): UsePopoverReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: popover.Context = {
    id: useId(),
    dir,
    getRootNode,
    ...props,
    open: props.open ?? props.defaultOpen,
    'open.controlled': props.open !== undefined,
  }

  const context: popover.Context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
  }

  const [state, send] = useMachine(popover.machine(context), { context })
  return popover.connect(state, send, normalizeProps)
}
