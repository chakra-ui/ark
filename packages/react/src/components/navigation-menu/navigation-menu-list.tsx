import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuListBaseProps extends PolymorphicProps {}
export interface NavigationMenuListProps extends HTMLProps<'div'>, NavigationMenuListBaseProps {}

export const NavigationMenuList = forwardRef<HTMLDivElement, NavigationMenuListProps>((props, ref) => {
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuList.displayName = 'NavigationMenuList'
