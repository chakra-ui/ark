import { mergeProps } from '@zag-js/react'
import { type ContentProps } from '@zag-js/tabs'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HtmlArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { TabPresence, type TabPresenceProps } from './tab-presence'
import { useTabsContext } from './tabs-context'

export type TabContentProps = InnerTabContentProps & Omit<TabPresenceProps, 'children'>

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const [presenceProps, tabContentProps] = splitPresenceProps(props)
  const [contentProps, localProps] = createSplitProps<ContentProps>()(tabContentProps, ['value'])

  return (
    <TabPresence {...presenceProps} {...contentProps}>
      <InnerTabContent ref={ref} {...contentProps} {...localProps} />
    </TabPresence>
  )
})

TabContent.displayName = 'TabContent'

type InnerTabContentProps = HtmlArkProps<'div'> & ContentProps

const InnerTabContent = forwardRef<HTMLDivElement, InnerTabContentProps>((props, ref) => {
  const [tabContentProps, divProps] = createSplitProps<ContentProps>()(props, ['value'])
  const { getContentProps } = useTabsContext()
  const mergedProps = mergeProps(getContentProps(tabContentProps), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})

InnerTabContent.displayName = 'InnerTabContent'
