import { mergeProps } from '@zag-js/solid'
import { type ContentProps } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import type { Assign } from '../types'
import { TabPresence, type TabPresenceProps } from './tab-presence'
import { useTabsContext } from './tabs-context'

export type TabContentProps = Assign<HTMLArkProps<'div'>, ContentProps> & TabPresenceProps

export const TabContent = (props: TabContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const [getContentProps, restProps] = createSplitProps<ContentProps>()(localProps, ['value'])

  const api = useTabsContext()
  const contentProps = mergeProps(() => api().getContentProps(getContentProps), restProps)

  return (
    <TabPresence {...presenceProps} {...getContentProps}>
      <ark.div {...contentProps} />
    </TabPresence>
  )
}
