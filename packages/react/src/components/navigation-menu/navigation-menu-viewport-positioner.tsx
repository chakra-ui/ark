import { mergeProps } from '@zag-js/react'
import type { ViewportProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { NavigationMenuViewportPropsProvider } from './use-navigation-menu-viewport-props-context'

export interface NavigationMenuViewportPositionerBaseProps extends ViewportProps, PolymorphicProps {}
export interface NavigationMenuViewportPositionerProps
  extends HTMLProps<'div'>, NavigationMenuViewportPositionerBaseProps {}

const splitViewportProps = createSplitProps<ViewportProps>()

export const NavigationMenuViewportPositioner = forwardRef<HTMLDivElement, NavigationMenuViewportPositionerProps>(
  (props, ref) => {
    const [viewportProps, localProps] = splitViewportProps(props, ['align'])
    const navigationMenu = useNavigationMenuContext()
    const mergedProps = mergeProps(navigationMenu.getViewportPositionerProps(viewportProps), localProps)

    return (
      <NavigationMenuViewportPropsProvider value={viewportProps}>
        <ark.div {...mergedProps} ref={ref} />
      </NavigationMenuViewportPropsProvider>
    )
  },
)

NavigationMenuViewportPositioner.displayName = 'NavigationMenuViewportPositioner'
