import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuArrowBaseProps extends PolymorphicProps {}
export interface NavigationMenuArrowProps extends HTMLProps<'div'>, NavigationMenuArrowBaseProps {}

export const NavigationMenuArrow = forwardRef<HTMLDivElement, NavigationMenuArrowProps>((props, ref) => {
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuArrow.displayName = 'NavigationMenuArrow'
