import { mergeProps } from '@zag-js/solid'
import type { ViewportProps } from '@zag-js/navigation-menu'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { NavigationMenuViewportPropsProvider } from './use-navigation-menu-viewport-props-context'

export interface NavigationMenuViewportPositionerBaseProps extends ViewportProps, PolymorphicProps<'div'> {}
export interface NavigationMenuViewportPositionerProps
  extends HTMLProps<'div'>, NavigationMenuViewportPositionerBaseProps {}

export const NavigationMenuViewportPositioner = (props: NavigationMenuViewportPositionerProps) => {
  const [viewportProps, localProps] = createSplitProps<ViewportProps>()(props, ['align'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getViewportPositionerProps(viewportProps), localProps)

  return (
    <NavigationMenuViewportPropsProvider value={viewportProps}>
      <ark.div {...mergedProps} />
    </NavigationMenuViewportPropsProvider>
  )
}
