'use client'

import { mergeProps } from '@zag-js/react'
import type { ContentProps, ContentState } from '@zag-js/tabs'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { useTabsContext } from './use-tabs-context.ts'

export interface TabContentState extends ContentState {}

export interface TabContentBaseProps extends ContentProps, PolymorphicProps<TabContentState> {}
export interface TabContentProps extends HTMLProps<'div'>, TabContentBaseProps {}

const splitContentProps = createSplitProps<ContentProps>()

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const [contentProps, localProps] = splitContentProps(props, ['value'])
  const tabs = useTabsContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence({
    ...renderStrategyProps,
    present: tabs.value === props.value,
    immediate: true,
  })

  const mergedProps = mergeProps(tabs.getContentProps(contentProps), presence.getPresenceProps(), localProps)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceProvider value={presence}>
      <PresenceGate presence={presence}>
        <ark.div {...mergedProps} ref={composedRefs} state={tabs.getContentState(contentProps)} />
      </PresenceGate>
    </PresenceProvider>
  )
})

TabContent.displayName = 'TabContent'
