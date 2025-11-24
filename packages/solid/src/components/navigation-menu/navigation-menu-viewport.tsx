import { mergeProps } from '@zag-js/solid'
import type { ViewportProps } from '@zag-js/navigation-menu'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuViewportBaseProps extends ViewportProps, PolymorphicProps<'div'> {}
export interface NavigationMenuViewportProps extends HTMLProps<'div'>, NavigationMenuViewportBaseProps {}

export const NavigationMenuViewport = (props: NavigationMenuViewportProps) => {
  const [viewportProps, localProps] = createSplitProps<ViewportProps>()(props, ['align'])
  const api = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(mergeProps(renderStrategyProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(
    () => api().getViewportProps(viewportProps),
    () => presenceApi().presenceProps,
    localProps,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
    </Show>
  )
}
