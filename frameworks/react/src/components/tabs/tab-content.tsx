import { mergeProps } from '@zag-js/react'
import type { ContentProps } from '@zag-js/tabs'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useRenderStrategyPropsContext } from '~/utils/render-strategy'
import { PresenceProvider, usePresence } from '../presence'
import { useTabsContext } from './use-tabs-context'

export interface TabContentProps extends Assign<HTMLArkProps<'div'>, ContentProps> {}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['value'])
  const tabs = useTabsContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({
    ...renderStrategyProps,
    present: tabs.value === props.value,
  })

  const mergedProps = mergeProps(
    tabs.getContentProps(contentProps),
    presence.getPresenceProps(ref),
    localProps,
  )

  return (
    <PresenceProvider value={presence}>
      {presence.isUnmounted ? null : <ark.div {...mergedProps} />}
    </PresenceProvider>
  )
})

TabContent.displayName = 'TabContent'
