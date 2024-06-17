import { mergeProps } from '@zag-js/solid'
import type { ContentProps } from '@zag-js/tabs'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useTabsContext } from './use-tabs-context'

export interface TabContentBaseProps extends ContentProps, PolymorphicProps<'div'> {}
export interface TabContentProps extends JSX.HTMLAttributes<HTMLDivElement>, TabContentBaseProps {}

export const TabContent = (props: TabContentProps) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['value'])
  const api = useTabsContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(
    mergeProps(renderStrategyProps, () => ({
      present: api().value === contentProps.value,
      immediate: true,
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
        <ark.div {...mergedProps} />
      </Show>
    </PresenceProvider>
  )
}
