import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuIndicatorBaseProps extends PolymorphicProps {}
export interface NavigationMenuIndicatorProps extends HTMLProps<'div'>, NavigationMenuIndicatorBaseProps {}

export const NavigationMenuIndicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>((props, ref) => {
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuIndicator.displayName = 'NavigationMenuIndicator'
