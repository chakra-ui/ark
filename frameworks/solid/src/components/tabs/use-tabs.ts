import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as tabs from '@zag-js/tabs'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTabsProps extends Optional<Omit<tabs.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the tabs when it is first rendered.
   * Use when you do not need to control the state of the tabs.
   */
  defaultValue?: tabs.Context['value']
}
export interface UseTabsReturn extends Accessor<tabs.Api<PropTypes>> {}

export const useTabs = (props: UseTabsProps): UseTabsReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    value: props.defaultValue,
    ...props,
  }))
  const [state, send] = useMachine(tabs.machine(context()), { context })

  return createMemo(() => tabs.connect(state, send, normalizeProps))
}
