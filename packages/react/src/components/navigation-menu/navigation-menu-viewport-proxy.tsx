import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuViewportProxyBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuViewportProxyProps
  extends Assign<HTMLProps<'div'>, NavigationMenuViewportProxyBaseProps> {}

export const NavigationMenuViewportProxy = forwardRef<HTMLDivElement, NavigationMenuViewportProxyProps>(
  (props, ref) => {
    const [viewportProxyProps, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'value'])
    const navigationMenu = useNavigationMenuContext()
    const mergedProps = mergeProps(navigationMenu.getViewportProxyProps(viewportProxyProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NavigationMenuViewportProxy.displayName = 'NavigationMenuViewportProxy'
