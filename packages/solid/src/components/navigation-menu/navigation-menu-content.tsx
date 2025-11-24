import type { LinkProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo, Show } from 'solid-js'
import type { Assign } from '../../types'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuContentBaseProps extends Omit<LinkProps, 'value'>, PolymorphicProps<'div'> {
  value?: LinkProps['value']
}
export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}

const splitLinkProps = createSplitProps<LinkProps>()

export const NavigationMenuContent = (props: NavigationMenuContentProps) => {
  const itemContext = useNavigationMenuItemPropsContext()

  const value = createMemo(() => props.value ?? itemContext?.value)
  const combinedProps = mergeProps(props, () => ({ value: value() }))

  const [contentProps, localProps] = splitLinkProps(combinedProps, ['current', 'onSelect', 'value'])
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
