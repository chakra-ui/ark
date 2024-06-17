import { mergeProps } from '@zag-js/react'
import type { ContentProps } from '@zag-js/tabs'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useTabsContext } from './use-tabs-context'

export interface TabContentBaseProps extends ContentProps, PolymorphicProps {}
export interface TabContentProps extends HTMLAttributes<HTMLDivElement>, TabContentBaseProps {}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['value'])
  const tabs = useTabsContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({
    ...renderStrategyProps,
    present: tabs.value === props.value,
    immediate: true,
  })

  const mergedProps = mergeProps(
    tabs.getContentProps(contentProps),
    presence.getPresenceProps(ref),
    localProps,
  )

  return (
    <PresenceProvider value={presence}>
      {presence.unmounted ? null : <ark.div {...mergedProps} />}
    </PresenceProvider>
  )
})

TabContent.displayName = 'TabContent'
