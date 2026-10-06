import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'

export interface NavigationMenuItemIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface NavigationMenuItemIndicatorProps extends HTMLProps<'span'>, NavigationMenuItemIndicatorBaseProps {}

export const NavigationMenuItemIndicator = (props: NavigationMenuItemIndicatorProps) => {
  const api = useNavigationMenuContext()
  const itemProps = useNavigationMenuItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
