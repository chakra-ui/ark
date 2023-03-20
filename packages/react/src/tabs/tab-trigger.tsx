import { type connect } from '@zag-js/tabs'
import { Children, cloneElement, type ReactElement } from 'react'
import { type Assign } from '../types'
import { useTabsContext } from './tabs-context'

type TabContext = Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]
export type TabTriggerProps = Assign<{ children: ReactElement }, TabContext>

export const TabTrigger = (props: TabTriggerProps) => {
  const { children, ...tabProps } = props
  const { getTriggerProps } = useTabsContext()

  const onlyChild = Children.only(children)
  return cloneElement(onlyChild, getTriggerProps(tabProps))
}
