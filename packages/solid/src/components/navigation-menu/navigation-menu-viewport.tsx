import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuViewportPropsContext } from './use-navigation-menu-viewport-props-context'

export interface NavigationMenuViewportBaseProps extends PolymorphicProps<'div'> {}
export interface NavigationMenuViewportProps extends HTMLProps<'div'>, NavigationMenuViewportBaseProps {}

export const NavigationMenuViewport = (props: NavigationMenuViewportProps) => {
  const viewportPropsContext = useNavigationMenuViewportPropsContext()
  const api = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(mergeProps(renderStrategyProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(
    () => api().getViewportProps(viewportPropsContext),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
    </Show>
  )
}
