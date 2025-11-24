import * as navigationMenu from '@zag-js/navigation-menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseNavigationMenuProps extends Optional<Omit<navigationMenu.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseNavigationMenuReturn extends Accessor<navigationMenu.Api<PropTypes>> {}

export const useNavigationMenu = (props?: UseNavigationMenuProps): UseNavigationMenuReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<navigationMenu.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(navigationMenu.machine, machineProps)
  return createMemo(() => navigationMenu.connect(service, normalizeProps))
}
