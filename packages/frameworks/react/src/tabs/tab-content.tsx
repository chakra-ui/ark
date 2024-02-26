import { mergeProps } from '@zag-js/react'
import { type ContentProps } from '@zag-js/tabs'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useRenderStrategyContext } from '../render-strategy'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

export interface TabContentProps extends Assign<HTMLArkProps<'div'>, ContentProps> {}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['value'])
  const api = useTabsContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence({ ...renderStrategyProps, present: api.value === props.value })

  const mergedProps = mergeProps(
    api.getContentProps(contentProps),
    presenceApi.getPresenceProps(ref),
    localProps,
  )

  return (
    <PresenceProvider value={presenceApi}>
      {presenceApi.isUnmounted ? null : <ark.div {...mergedProps} />}
    </PresenceProvider>
  )
})

TabContent.displayName = 'TabContent'
