import type { DrawerStackApi } from '@zag-js/drawer'
import type { PropTypes } from '@zag-js/svelte'
import type { Accessor } from '$lib/types'
import { createContext } from '../../utils/create-context'

export interface UseDrawerStackContext extends Accessor<DrawerStackApi<PropTypes>> {}

export const [DrawerStackProvider, useDrawerStackContext] = createContext<UseDrawerStackContext>({
  name: 'DrawerStackContext',
  hookName: 'useDrawerStackContext',
  providerName: '<DrawerStackProvider />',
})
