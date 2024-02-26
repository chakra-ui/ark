import * as collapsible from '@zag-js/collapsible'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Context, 'open.controlled'>, 'id'> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseCollapsibleReturn = any

// export interface UseCollapsibleReturn extends collapsible.Api<PropTypes> {
//   /**
//    * Whether the content is unmounted
//    */
//   isUnmounted: boolean
// }

export const useCollapsible = (props: UseCollapsibleProps): UseCollapsibleReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(collapsible.machine(context), { context })

  return createMemo(() => collapsible.connect(state, send, normalizeProps))
}
