import type { ViewportProps } from '@zag-js/navigation-menu'
import { createContext } from '$lib/utils/create-context'
import type { Accessor } from '$lib/types'

export const [setNavigationMenuViewportPropsContext, getNavigationMenuViewportPropsContext] = createContext<
  Accessor<ViewportProps>
>({
  name: 'NavigationMenuViewportPropsContext',
  strict: false,
})
