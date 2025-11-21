import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as navigationMenu from '@zag-js/navigation-menu'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseNavigationMenuProps extends Optional<Omit<navigationMenu.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseNavigationMenuReturn extends navigationMenu.Api<PropTypes> {}

export const useNavigationMenu = (props?: UseNavigationMenuProps): UseNavigationMenuReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: navigationMenu.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(navigationMenu.machine, machineProps)
  return navigationMenu.connect(service, normalizeProps)
}
