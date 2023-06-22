import * as popover from '@zag-js/popover'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UsePopoverProps = Optional<popover.Context, 'id'>

export const usePopover = (props: UsePopoverProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(popover.machine(context), { context })
  return createMemo(() => popover.connect(state, send, normalizeProps))
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
