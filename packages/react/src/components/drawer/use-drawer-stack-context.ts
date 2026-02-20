import type { DrawerStackApi } from '@zag-js/drawer'
import type { PropTypes } from '@zag-js/react'
import { createContext } from '../../utils/create-context'

export interface UseDrawerStackContext extends DrawerStackApi<PropTypes> {}

export const [DrawerStackProvider, useDrawerStackContext] = createContext<UseDrawerStackContext>({
  name: 'DrawerStackContext',
  hookName: 'useDrawerStackContext',
  providerName: '<DrawerStackProvider />',
})
