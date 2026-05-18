import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs.ts'
import { useRenderStrategyContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { PresenceProvider, usePresence } from '../presence/index.tsx'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'

export interface NavigationMenuIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface NavigationMenuIndicatorProps extends HTMLProps<'div'>, NavigationMenuIndicatorBaseProps {}

export const NavigationMenuIndicator = (props: NavigationMenuIndicatorProps) => {
  const api = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(mergeProps(renderStrategyProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(
    () => api().getIndicatorProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <PresenceProvider value={presenceApi}>
      <Show when={!presenceApi().unmounted}>
        <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
      </Show>
    </PresenceProvider>
  )
}
