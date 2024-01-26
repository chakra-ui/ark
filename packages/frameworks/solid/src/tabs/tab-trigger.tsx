import { mergeProps } from '@zag-js/solid'
import { type TriggerProps } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

export interface TabTriggerProps extends Assign<HTMLArkProps<'button'>, TriggerProps> {}

export const TabTrigger: ArkComponent<'button', TriggerProps> = (props) => {
  const [tabParams, restProps] = createSplitProps<TriggerProps>()(props, ['disabled', 'value'])
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(tabParams), restProps)

  return <ark.button {...mergedProps} />
}
