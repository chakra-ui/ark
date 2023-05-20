import { mergeProps } from '@zag-js/solid'
import { type connect } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

type TabContentParams = Parameters<ReturnType<typeof connect>['getContentProps']>[0]

export type TabContentProps = Assign<HTMLArkProps<'div'>, TabContentParams>

export const TabContent = (props: TabContentProps) => {
  const [tabParams, restProps] = createSplitProps<TabContentParams>()(props, ['value'])

  const api = useTabsContext()
  const contentProps = mergeProps(() => api().getContentProps(tabParams), restProps)

  return <ark.div {...contentProps} />
}
