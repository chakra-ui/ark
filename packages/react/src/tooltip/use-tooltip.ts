import * as tooltip from '@zag-js/tooltip'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { splitProps } from '../split-props'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseTooltipProps = Omit<tooltip.Context, 'id'>

export const useTooltip = (props: UseTooltipProps) => {
  const [tooltipProps, htmlProps] = splitProps(props, [
    'aria-label',
    'closeDelay',
    'closeOnEsc',
    'closeOnPointerDown',
    'disabled',
    'getRootNode',
    'ids',
    'interactive',
    'onClose',
    'onOpen',
    'openDelay',
    'positioning',
  ])

  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...tooltipProps,
  })

  const [state, send] = useMachine(tooltip.machine(initialContext), { context: initialContext })

  const api = tooltip.connect(state, send, normalizeProps)
  return { api, htmlProps }
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
