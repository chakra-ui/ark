import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { UsePresenceProps } from '../presence'
import { type Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { emits, props } from './tabs.props'
import { useTabs, type UseTabsProps } from './use-tabs'

export interface TabsProps extends Assign<HTMLArkProps<'div'>, UseTabsProps>, UsePresenceProps {}

export const Tabs = defineComponent<TabsProps>(
  (props, { slots, attrs, emit }) => {
    const api = useTabs(props, emit)
    TabsProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'Tabs',
    props,
    emits,
  },
)
