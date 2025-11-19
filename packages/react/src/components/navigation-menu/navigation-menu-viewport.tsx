import { mergeProps } from '@zag-js/react'
import type { ViewportProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuViewportBaseProps extends ViewportProps, PolymorphicProps {}
export interface NavigationMenuViewportProps extends Assign<HTMLProps<'div'>, NavigationMenuViewportBaseProps> {}

export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>((props, ref) => {
  const [viewportProps, localProps] = createSplitProps<ViewportProps>()(props, ['align'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getViewportProps(viewportProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuViewport.displayName = 'NavigationMenuViewport'
