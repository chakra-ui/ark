import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as tabs from '@zag-js/tabs'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTabsProps extends Optional<Omit<tabs.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTabsReturn extends Accessor<tabs.Api<PropTypes>> {}

export const useTabs = (props: UseTabsProps = {}): UseTabsReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<tabs.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const service = useMachine(tabs.machine, machineProps)
  return createMemo(() => tabs.connect(service, normalizeProps))
}
