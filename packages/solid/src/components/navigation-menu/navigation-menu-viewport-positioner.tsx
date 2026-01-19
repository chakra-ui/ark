import { mergeProps } from '@zag-js/solid'
import type { ViewportProps } from '@zag-js/navigation-menu'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuViewportPositionerBaseProps extends ViewportProps, PolymorphicProps<'div'> {}
export interface NavigationMenuViewportPositionerProps
  extends HTMLProps<'div'>, NavigationMenuViewportPositionerBaseProps {}

export const NavigationMenuViewportPositioner = (props: NavigationMenuViewportPositionerProps) => {
  const [positionerProps, localProps] = createSplitProps<ViewportProps>()(props, ['align'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getViewportPositionerProps(positionerProps), localProps)

  return <ark.div {...mergedProps} />
}
