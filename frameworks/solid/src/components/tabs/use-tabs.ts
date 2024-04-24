import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as tabs from '@zag-js/tabs'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTabsProps extends Optional<tabs.Context, 'id'> {}
export interface UseTabsReturn extends Accessor<tabs.Api<PropTypes>> {}

export const useTabs = (props: UseTabsProps): UseTabsReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(tabs.machine(context), { context })

  return createMemo(() => tabs.connect(state, send, normalizeProps))
}
