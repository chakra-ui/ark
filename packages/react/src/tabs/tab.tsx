import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { connect } from '@zag-js/tabs'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

export type TabProps = Assign<
  HTMLArkProps<'button'>,
  Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]
>

export const Tab = forwardRef<'button', TabProps>((props, ref) => {
  const { disabled, value, ...buttonProps } = props
  const { getTriggerProps } = useTabsContext()
  const mergedProps = mergeProps(getTriggerProps({ disabled, value }), buttonProps)

  return <ark.button {...mergedProps} ref={ref} />
})
