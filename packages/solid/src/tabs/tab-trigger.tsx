import { type Assign } from '@polymorphic-factory/solid'
import { type connect } from '@zag-js/tabs'
import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { createSplitProps } from '../create-split-props'
import { ssrSpread } from '../ssr-spread'
import { useTabsContext } from './tabs-context'

type GetTriggerPropsArgs = Parameters<ReturnType<typeof connect>['getTriggerProps']>[0]

export type TabTriggerProps = Assign<GetTriggerPropsArgs, { children: JSX.Element }>

export const TabTrigger = (props: TabTriggerProps) => {
  const [tabProps, localProps] = createSplitProps<GetTriggerPropsArgs>()(props, [
    'disabled',
    'value',
  ])
  const tabs = useTabsContext()
  const triggerProps = tabs().getTriggerProps(tabProps)

  const getChildren = children(() => ssrSpread(localProps.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren()
}
