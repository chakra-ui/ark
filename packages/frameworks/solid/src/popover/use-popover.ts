import * as popover from '@zag-js/popover'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UsePopoverProps = Optional<popover.Context, 'id'>
export type UsePopoverReturn = Accessor<popover.Api<PropTypes>>

export const usePopover = (props: UsePopoverProps): UsePopoverReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(popover.machine(context), { context })
  return createMemo(() => popover.connect(state, send, normalizeProps))
}
