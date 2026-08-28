import type { ViewportProps } from '@zag-js/navigation-menu'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export const [setNavigationMenuViewportPropsContext, getNavigationMenuViewportPropsContext] = createContext<
  ComputedRef<ViewportProps>
>('NavigationMenuViewportPropsContext')
