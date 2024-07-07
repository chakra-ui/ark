import * as floatingPanel from '@zag-js/floating-panel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseFloatingPanelProps
  extends Optional<Omit<floatingPanel.Context, 'getRootNode'>, 'id'> {
  /**
   * The initial open state of the floating panel when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: floatingPanel.Context['open']
}

export interface UseFloatingPanelReturn extends floatingPanel.Api<PropTypes> {}

export const useFloatingPanel = (props: UseFloatingPanelProps = {}): UseFloatingPanelReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: floatingPanel.Context = {
    id: useId(),
    dir,
    getRootNode,
    open: props.defaultOpen,
    ...props,
  }

  const context: floatingPanel.Context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
  }

  const [state, send] = useMachine(floatingPanel.machine(initialContext), { context })

  return floatingPanel.connect(state, send, normalizeProps)
}
