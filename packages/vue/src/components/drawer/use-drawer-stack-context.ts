import type { DrawerStackApi } from '@zag-js/drawer'
import type { PropTypes } from '@zag-js/vue'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseDrawerStackContext extends ComputedRef<DrawerStackApi<PropTypes>> {}

export const [DrawerStackProvider, useDrawerStackContext] = createContext<UseDrawerStackContext>('DrawerStackContext')
