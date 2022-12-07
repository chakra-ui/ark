import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/tabs'
import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { createSplitProps } from '../create-split-props'
import { useTabsContext } from './tabs-context'

type GetTriggerPropsArgs = Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]

export type TabTriggerProps = Assign<GetTriggerPropsArgs, { children: JSX.Element }>

export const TabTrigger = (props: TabTriggerProps) => {
  const [tabProps, localProps] = createSplitProps<GetTriggerPropsArgs>()(props, [
    'disabled',
    'value',
  ])
  const tabs = useTabsContext()
  const getChildren = children(() => localProps.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, tabs().getTriggerProps(tabProps))
    }
  })

  return <>{getChildren()}</>
}
