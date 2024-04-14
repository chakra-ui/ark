import * as popover from '@zag-js/popover'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UsePopoverProps extends Omit<Optional<popover.Context, 'id'>, 'open.controlled'> {}
export interface UsePopoverReturn extends Accessor<popover.Api<PropTypes>> {}

export const usePopover = (props: UsePopoverProps): UsePopoverReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(popover.machine(context), { context })
  return createMemo(() => popover.connect(state, send, normalizeProps))
}
