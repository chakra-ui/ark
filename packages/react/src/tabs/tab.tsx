import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { connect } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

type TabContext = Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]
export type TabProps = Assign<HTMLArkProps<'button'>, TabContext>

// trigger
export const Tab = forwardRef<'button', TabProps>((props, ref) => {
  const [tabProps, buttonProps] = createSplitProps<TabContext>()(props, ['disabled', 'value'])
  const { getTriggerProps } = useTabsContext()
  const mergedProps = mergeProps(getTriggerProps(tabProps), buttonProps)

  return <ark.button {...mergedProps} ref={ref} />
})
