import { mergeProps } from '@zag-js/solid'
import { type TriggerProps } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

export type TabTriggerProps = Assign<HTMLArkProps<'button'>, TriggerProps>

export const TabTrigger = (props: TabTriggerProps) => {
  const [tabParams, restProps] = createSplitProps<TriggerProps>()(props, ['disabled', 'value'])
  const api = useTabsContext()
  const triggerProps = mergeProps(() => api().getTriggerProps(tabParams), restProps)

  return <ark.button {...triggerProps} />
}
