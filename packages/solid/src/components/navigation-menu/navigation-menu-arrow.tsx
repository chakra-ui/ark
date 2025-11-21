import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuArrowBaseProps extends PolymorphicProps<'div'> {}
export interface NavigationMenuArrowProps extends HTMLProps<'div'>, NavigationMenuArrowBaseProps {}

export const NavigationMenuArrow = (props: NavigationMenuArrowProps) => {
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getArrowProps(), props)

  return <ark.div {...mergedProps} />
}
