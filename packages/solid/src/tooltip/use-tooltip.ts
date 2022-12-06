import { normalizeProps, useMachine } from '@zag-js/solid'
import * as tooltip from '@zag-js/tooltip'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseTooltipProps = Optional<tooltip.Context, 'id'>
export type UseTooltipReturn = ReturnType<typeof useTooltip>

export const useTooltip = (props: UseTooltipProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)

  const [state, send] = useMachine(tooltip.machine(context), { context })
  return createMemo(() => tooltip.connect(state, send, normalizeProps))
}
