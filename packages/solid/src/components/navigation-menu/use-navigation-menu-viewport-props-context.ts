import type { ViewportProps } from '@zag-js/navigation-menu'
import { createContext } from '../../utils/create-context'

export const [NavigationMenuViewportPropsProvider, useNavigationMenuViewportPropsContext] =
  createContext<ViewportProps>({
    hookName: 'useNavigationMenuViewportPropsContext',
    providerName: '<NavigationMenuViewportPropsProvider />',
    strict: false,
  })
