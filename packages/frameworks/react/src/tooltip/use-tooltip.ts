import { normalizeProps, useMachine } from '@zag-js/react'
import * as tooltip from '@zag-js/tooltip'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseTooltipProps extends Optional<tooltip.Context, 'id'> {}
export type UseTooltipReturn = tooltip.Api

export const useTooltip = (props: UseTooltipProps): UseTooltipReturn => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }
  const [state, send] = useMachine(tooltip.machine(context), { context })
  return tooltip.connect(state, send, normalizeProps)
}
