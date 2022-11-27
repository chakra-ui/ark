import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

type GetTriggerPropsArgs = Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]

export type TabProps = Assign<HTMLArkProps<'button'>, GetTriggerPropsArgs>

export const Tab = (props: TabProps) => {
  const [tabProps, buttonProps] = createSplitProps<GetTriggerPropsArgs>()(props, [
    'disabled',
    'value',
  ])
  const tabs = useTabsContext()

  return <ark.button {...tabs().getTriggerProps(tabProps)} {...buttonProps} />
}
