import { mergeProps } from '@zag-js/solid'
import { type TriggerProps } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTabsContext } from './use-tabs-context'

export interface TabTriggerProps extends Assign<HTMLArkProps<'button'>, TriggerProps> {}

export const TabTrigger = (props: TabTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['disabled', 'value'])
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
