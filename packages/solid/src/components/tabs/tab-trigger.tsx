import { mergeProps } from '@zag-js/solid'
import type { TriggerProps } from '@zag-js/tabs'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
export interface TabTriggerProps extends Assign<HTMLProps<'button'>, TabTriggerBaseProps> {}

export const TabTrigger = (props: TabTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['disabled', 'value'])
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
