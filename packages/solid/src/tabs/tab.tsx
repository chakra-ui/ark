import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/tabs'
import { mergeProps, splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabProps = Assign<
  HTMLArkProps<'button'>,
  Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]
>

export const Tab = (props: TabProps) => {
  const [tabProps, buttonProps] = splitProps(props, ['disabled', 'value'])
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs().getTriggerProps(tabProps), buttonProps)

  return <ark.button {...mergedProps} />
}
