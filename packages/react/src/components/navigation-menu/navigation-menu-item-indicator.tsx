import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuItemIndicatorBaseProps extends PolymorphicProps {}
export interface NavigationMenuItemIndicatorProps extends HTMLProps<'div'>, NavigationMenuItemIndicatorBaseProps {}

export const NavigationMenuItemIndicator = forwardRef<HTMLDivElement, NavigationMenuItemIndicatorProps>(
  (props, ref) => {
    const navigationMenu = useNavigationMenuContext()
    const itemProps = useNavigationMenuItemPropsContext()
    const mergedProps = mergeProps(navigationMenu.getItemIndicatorProps(itemProps!), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NavigationMenuItemIndicator.displayName = 'NavigationMenuItemIndicator'
