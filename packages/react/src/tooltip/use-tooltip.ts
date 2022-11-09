import { normalizeProps, useMachine } from '@zag-js/react'
import * as tooltip from '@zag-js/tooltip'
import { useId } from 'react'

export type UseTooltipProps = Omit<tooltip.Context, 'id'>

export const useTooltip = (props: UseTooltipProps) => {
  const context = {
    id: useId(),
    ...props,
  }
  const [state, send] = useMachine(tooltip.machine(context), { context })

  return tooltip.connect(state, send, normalizeProps)
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
