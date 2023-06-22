import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as tooltip from '@zag-js/tooltip'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseTooltipProps = Optional<tooltip.Context, 'id'>
export type UseTooltipReturn = ReturnType<typeof useTooltip>

export const useTooltip = (props: UseTooltipProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(tooltip.machine(context), { context })
  return createMemo(() => tooltip.connect(state, send, normalizeProps))
}
