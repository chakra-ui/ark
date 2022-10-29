import * as tooltip from '@zag-js/tooltip'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UseTooltipProps = Omit<tooltip.Context, 'id'>

export const useTooltip = (props: UseTooltipProps) => {
  const {
    ['aria-label']: ariaLabel,
    closeDelay,
    closeOnEsc,
    closeOnPointerDown,
    disabled,
    getRootNode,
    ids,
    interactive,
    onClose,
    onOpen,
    openDelay,
    positioning,
    ...htmlProps
  } = props

  const [state, send] = useMachine(
    tooltip.machine({
      id: useId(),
      'aria-label': ariaLabel,
      closeDelay,
      closeOnEsc,
      closeOnPointerDown,
      disabled,
      getRootNode,
      ids,
      interactive,
      onClose,
      onOpen,
      openDelay,
      positioning,
    }),
  )

  const api = tooltip.connect(state, send, normalizeProps)
  return { api, htmlProps }
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
