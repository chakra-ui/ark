import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UsePopoverProps
  extends Optional<Omit<popover.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the popover when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: popover.Context['open']
}
export interface UsePopoverReturn extends Accessor<popover.Api<PropTypes>> {}

export const usePopover = (props: UsePopoverProps): UsePopoverReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    ...props,
  }))

  const [state, send] = useMachine(popover.machine(context()), { context })
  return createMemo(() => popover.connect(state, send, normalizeProps))
}
