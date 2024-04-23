import { mergeProps } from '@zag-js/solid'
import type { ContentProps } from '@zag-js/tabs'
import { Show } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
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
      <Show when={!presenceApi().unmounted}>
        <ark.div {...mergedProps} />
      </Show>
    </PresenceProvider>
  )
}
