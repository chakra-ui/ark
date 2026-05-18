import { mergeProps } from '@zag-js/solid'
import type { ContentProps } from '@zag-js/tabs'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { useRenderStrategyContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { PresenceProvider, usePresence } from '../presence/index.tsx'
import { useTabsContext } from './use-tabs-context.ts'

export interface TabContentBaseProps extends ContentProps, PolymorphicProps<'div'> {}
export interface TabContentProps extends HTMLProps<'div'>, TabContentBaseProps {}

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
        <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
      </Show>
    </PresenceProvider>
  )
}
