import type { ContentProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Assign } from '../../types'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuContentBaseProps extends Partial<ContentProps>, PolymorphicProps<'div'> {}
export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}

const splitContentProps = createSplitProps<ContentProps>()

export const NavigationMenuContent = (props: NavigationMenuContentProps) => {
  const api = useNavigationMenuContext()
  const itemContext = useNavigationMenuItemPropsContext()

  const value = createMemo(() => props.value ?? itemContext?.value)
  const combinedProps = mergeProps(props, () => ({ value: value() }))

  const [contentProps, localProps] = splitContentProps(combinedProps, ['value'])
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

  const viewportNode = createMemo(() => api().getViewportNode())
  const isViewportRendered = createMemo(() => api().isViewportRendered)

  const content = (
    <PresenceProvider value={presenceApi}>
      <Show when={!presenceApi().unmounted}>
        <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
      </Show>
    </PresenceProvider>
  )

  return (
    <Show when={isViewportRendered() && viewportNode()} fallback={content}>
      <ark.div {...api().getViewportProxyProps(contentProps)} />
      <ark.div {...api().getTriggerProxyProps(contentProps)} />
      <Portal mount={viewportNode()!}>{content}</Portal>
    </Show>
  )
}
