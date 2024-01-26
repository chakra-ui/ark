import { mergeProps } from '@zag-js/solid'
import { type ContentProps } from '@zag-js/tabs'
import { Show } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, usePresencePropsContext } from '../presence'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

export interface TabContentProps extends Assign<HTMLArkProps<'div'>, ContentProps> {}

export const TabContent: ArkComponent<'div', ContentProps> = (props: TabContentProps) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['value'])
  const api = useTabsContext()
  const presenceProps = usePresencePropsContext()
  const presenceApi = usePresence(
    mergeProps(presenceProps, () => ({ present: api().value === contentProps.value })),
  )
  const mergedProps = mergeProps(
    () => api().getContentProps(contentProps),
    () => presenceApi().presenceProps,
    localProps,
  )

  return (
    <PresenceProvider value={presenceApi}>
      <Show when={!presenceApi().isUnmounted}>
        <ark.div {...mergedProps} />
      </Show>
    </PresenceProvider>
  )
}
