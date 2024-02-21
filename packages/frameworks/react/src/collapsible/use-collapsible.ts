import * as collapsible from '@zag-js/collapsible'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId, useRef } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Context, 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the popover.
   */
  defaultOpen?: collapsible.Context['open']
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseCollapsibleReturn = any

// export interface UseCollapsibleReturn extends collapsible.Api<PropTypes> {
//   /**
//    * Whether the content is unmounted
//    */
//   isUnmounted: boolean
// }

export const useCollapsible = (props: UseCollapsibleProps = {}): UseCollapsibleReturn => {
  const { lazyMount, unmountOnExit } = props
  const wasEverPresent = useRef(false)

  const initialContext: collapsible.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    open: props.defaultOpen ?? props.open,
    'open.controlled': props.open !== undefined,
  }

  const context: collapsible.Context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
  }

  const [state, send] = useMachine(collapsible.machine(initialContext), { context })
  const api = collapsible.connect(state, send, normalizeProps)

  if (api.isOpen) {
    wasEverPresent.current = true
  }

  const isUnmounted =
    (!api.isOpen && !wasEverPresent.current && lazyMount) ||
    (unmountOnExit && !api.isOpen && wasEverPresent.current)

  return { ...api, isUnmounted }
}
