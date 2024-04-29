import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId, useRef } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import type { RenderStrategyProps } from '../../utils/render-strategy'
import { useEvent } from '../../utils/use-event'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'>,
    RenderStrategyProps {
  /**
   * The initial open state of the collapsible when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: collapsible.Context['open']
}

export interface UseCollapsibleReturn extends collapsible.Api<PropTypes> {
  /**
   * Whether the content is unmounted
   */
  isUnmounted?: boolean
}

export const useCollapsible = (props: UseCollapsibleProps = {}): UseCollapsibleReturn => {
  const { lazyMount, unmountOnExit } = props
  const { dir } = useLocaleContext()
  const wasVisible = useRef(false)

  const initialContext: collapsible.Context = {
    id: useId(),
    dir,
    getRootNode: useEnvironmentContext(),
    ...props,
    open: props.open ?? props.defaultOpen,
    'open.controlled': props.open !== undefined,
  }

  const context: collapsible.Context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
  }

  const [state, send] = useMachine(collapsible.machine(initialContext), { context })
  const api = collapsible.connect(state, send, normalizeProps)

  if (api.visible) {
    wasVisible.current = true
  }

  const isUnmounted =
    (!api.visible && !wasVisible.current && lazyMount) ||
    (unmountOnExit && !api.visible && wasVisible.current)

  return { ...api, isUnmounted }
}
