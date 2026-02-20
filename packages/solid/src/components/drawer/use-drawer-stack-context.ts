import type { DrawerStackApi } from '@zag-js/drawer'
import type { PropTypes } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface UseDrawerStackContext extends Accessor<DrawerStackApi<PropTypes>> {}

export const [DrawerStackProvider, useDrawerStackContext] = createContext<UseDrawerStackContext>({
  hookName: 'useDrawerStackContext',
  providerName: '<DrawerStackProvider />',
})
