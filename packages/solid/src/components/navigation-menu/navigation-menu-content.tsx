import { mergeProps } from '@zag-js/solid'
import type { LinkProps } from '@zag-js/navigation-menu'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import type { Assign } from '../../types'

export interface NavigationMenuContentBaseProps extends LinkProps, PolymorphicProps<'div'> {}
export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}

export const NavigationMenuContent = (props: NavigationMenuContentProps) => {
  const [contentProps, localProps] = createSplitProps<LinkProps>()(props, ['current', 'onSelect', 'value'])
  const api = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(
    mergeProps(renderStrategyProps, () => ({
      present: api().value === contentProps.value,
    })),
  )
  const mergedProps = mergeProps(
    () => api().getContentProps(contentProps),
    () => presenceApi().presenceProps,
    localProps,
  )

  return (
    <PresenceProvider value={presenceApi}>
      <Show when={!presenceApi().unmounted}>
        <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
      </Show>
    </PresenceProvider>
  )
}
