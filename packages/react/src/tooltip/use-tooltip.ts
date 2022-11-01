import { normalizeProps, useMachine } from '@zag-js/react'
import * as tooltip from '@zag-js/tooltip'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseTooltipProps = Omit<tooltip.Context, 'id'>

export const useTooltip = (props: UseTooltipProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })
  const [state, send] = useMachine(tooltip.machine(initialContext), { context: initialContext })

  return tooltip.connect(state, send, normalizeProps)
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
