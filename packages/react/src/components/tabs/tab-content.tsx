import { mergeProps } from '@zag-js/react'
import type { ContentProps } from '@zag-js/tabs'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { useDebounce } from '../../utils/use-debounce'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useTabsContext } from './use-tabs-context'

export interface TabContentBaseProps extends ContentProps, PolymorphicProps {}
export interface TabContentProps extends HTMLProps<'div'>, TabContentBaseProps {}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['value'])
  const tabs = useTabsContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence({
    ...renderStrategyProps,
    present: useDebounce(tabs.value === props.value, 0),
    immediate: true,
  })

  const mergedProps = mergeProps(
    tabs.getContentProps(contentProps),
    presence.getPresenceProps(),
    localProps,
  )

  return (
    <PresenceProvider value={presence}>
      {presence.unmounted ? null : (
        <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
      )}
    </PresenceProvider>
  )
})

TabContent.displayName = 'TabContent'
