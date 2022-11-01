import { forwardRef } from '@polymorphic-factory/react'
import type { connect } from '@zag-js/tabs'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { useTabsContext } from './tabs-context'

export type TabProps = Assign<
  HTMLAtlasProps<'button'>,
  Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]
>

export const Tab = forwardRef<'button', TabProps>((props, ref) => {
  const [tabProps, htmlProps] = splitProps(props, ['disabled', 'value'])
  const { getTriggerProps } = useTabsContext()

  return <atlas.button {...htmlProps} {...getTriggerProps(tabProps)} ref={ref} />
})
