import { normalizeProps, useMachine } from '@zag-js/react'
import * as tooltip from '@zag-js/tooltip'
import { useId } from 'react'
import type { OptionalId } from '../types'

export type UseTooltipProps = OptionalId<tooltip.Context>

export const useTooltip = (props: UseTooltipProps) => {
  const context = {
    id: useId(),
    ...props,
  }
  const [state, send] = useMachine(tooltip.machine(context), { context })
  return tooltip.connect(state, send, normalizeProps)
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
