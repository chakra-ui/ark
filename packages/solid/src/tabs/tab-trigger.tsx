import { type Assign } from '@polymorphic-factory/solid'
import { mergeProps } from '@zag-js/solid'
import { type connect } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

type TabTriggerParams = Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]

export type TabTriggerProps = Assign<HTMLArkProps<'button'>, TabTriggerParams>

export const TabTrigger = (props: TabTriggerProps) => {
  const [tabParams, restProps] = createSplitProps<TabTriggerParams>()(props, ['disabled', 'value'])

  const api = useTabsContext()
  const triggerProps = mergeProps(() => api().getTriggerProps(tabParams), restProps)

  return <ark.button {...triggerProps} />
}
