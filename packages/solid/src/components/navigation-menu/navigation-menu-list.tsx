import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuListBaseProps extends PolymorphicProps<'div'> {}
export interface NavigationMenuListProps extends HTMLProps<'div'>, NavigationMenuListBaseProps {}

export const NavigationMenuList = (props: NavigationMenuListProps) => {
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getListProps(), props)

  return <ark.div {...mergedProps} />
}
