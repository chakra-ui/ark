import { mergeProps } from '@zag-js/react'
import type { ViewportProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuViewportPositionerBaseProps extends ViewportProps, PolymorphicProps {}
export interface NavigationMenuViewportPositionerProps
  extends HTMLProps<'div'>,
    NavigationMenuViewportPositionerBaseProps {}

export const NavigationMenuViewportPositioner = forwardRef<HTMLDivElement, NavigationMenuViewportPositionerProps>(
  (props, ref) => {
    const [positionerProps, localProps] = createSplitProps<ViewportProps>()(props, ['align'])
    const navigationMenu = useNavigationMenuContext()
    const mergedProps = mergeProps(navigationMenu.getViewportPositionerProps(positionerProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NavigationMenuViewportPositioner.displayName = 'NavigationMenuViewportPositioner'
