import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/navigation-menu'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuViewportProxyBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface NavigationMenuViewportProxyProps extends HTMLProps<'div'>, NavigationMenuViewportProxyBaseProps {}

export const NavigationMenuViewportProxy = (props: NavigationMenuViewportProxyProps) => {
  const [viewportProxyProps, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'value'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getViewportProxyProps(viewportProxyProps), localProps)

  return <ark.div {...mergedProps} />
}
