import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as tabs from '@zag-js/tabs'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTabsProps extends Optional<Omit<tabs.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTabsReturn extends Accessor<tabs.Api<PropTypes>> {}

export const useTabs = (props: UseTabsProps): UseTabsReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const context = createMemo(() => ({
    id: createUniqueId(),
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(tabs.machine(context()), { context })

  return createMemo(() => tabs.connect(state, send, normalizeProps))
}
