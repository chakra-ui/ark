import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface NavigationMenuItemIndicatorProps extends HTMLProps<'div'>, NavigationMenuItemIndicatorBaseProps {}

export const NavigationMenuItemIndicator = (props: NavigationMenuItemIndicatorProps) => {
  const api = useNavigationMenuContext()
  const itemProps = useNavigationMenuItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
