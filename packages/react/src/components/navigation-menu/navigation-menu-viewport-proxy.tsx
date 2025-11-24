import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { ensure } from '@zag-js/utils'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuViewportProxyBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {}
export interface NavigationMenuViewportProxyProps extends HTMLProps<'div'>, NavigationMenuViewportProxyBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const NavigationMenuViewportProxy = forwardRef<HTMLDivElement, NavigationMenuViewportProxyProps>(
  (props, ref) => {
    const itemContext = useNavigationMenuItemPropsContext()
    ensure(itemContext, () => 'NavigationMenu.ViewportProxy must be used within NavigationMenu.Item')

    const value = itemContext.value
    const disabled = props.disabled ?? itemContext.disabled

    const [viewportProxyProps, localProps] = splitItemProps({ ...props, value, disabled }, ['disabled', 'value'])
    const navigationMenu = useNavigationMenuContext()
    const mergedProps = mergeProps(navigationMenu.getViewportProxyProps(viewportProxyProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NavigationMenuViewportProxy.displayName = 'NavigationMenuViewportProxy'
