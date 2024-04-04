import { mergeProps } from '@zag-js/solid'
import { type ContentProps } from '@zag-js/tabs'
import { Show } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useRenderStrategyContext } from '../render-strategy'
import type { Assign } from '../types'
import { useTabsContext } from './use-tabs-context'

export interface TabContentProps extends Assign<HTMLArkProps<'div'>, ContentProps> {}

export const TabContent = (props: TabContentProps) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['value'])
  const api = useTabsContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(
    mergeProps(renderStrategyProps, () => ({ present: api().value === contentProps.value })),
  )
  const mergedProps = mergeProps(
    () => api().getContentProps(contentProps),
    () => presenceApi().presenceProps,
    localProps,
  )

  return (
    <PresenceProvider value={presenceApi}>
      <Show when={!presenceApi().isUnmounted}>
        <ark.div {...mergedProps()} />
      </Show>
    </PresenceProvider>
  )
}
