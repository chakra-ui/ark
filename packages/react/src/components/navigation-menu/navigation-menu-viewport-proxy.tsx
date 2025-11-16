import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuViewportProxyBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {
  value?: string
}
export interface NavigationMenuViewportProxyProps
  extends Assign<HTMLProps<'div'>, NavigationMenuViewportProxyBaseProps> {}

export const NavigationMenuViewportProxy = forwardRef<HTMLDivElement, NavigationMenuViewportProxyProps>(
  (props, ref) => {
    const itemPropsContext = useNavigationMenuItemPropsContext()
    const [_viewportProxyProps, localProps] = createSplitProps<Partial<ItemProps>>()(props, ['disabled', 'value'])
    const viewportProxyProps = { ...itemPropsContext, ..._viewportProxyProps }
    const navigationMenu = useNavigationMenuContext()
    const mergedProps = mergeProps(navigationMenu.getViewportProxyProps(viewportProxyProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NavigationMenuViewportProxy.displayName = 'NavigationMenuViewportProxy'
