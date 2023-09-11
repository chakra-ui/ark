import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UsePopoverProps extends Optional<popover.Context, 'id'> {}
export type UsePopoverReturn = popover.Api

export const usePopover = (props: UsePopoverProps): UsePopoverReturn => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(popover.machine(context), { context })
  return popover.connect(state, send, normalizeProps)
}
