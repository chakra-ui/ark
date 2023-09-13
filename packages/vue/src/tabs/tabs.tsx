import { defineComponent, type SlotsType, type VNode } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { emits, props } from './tabs.props'
import { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs'

export type TabsProps = Assign<HTMLArkProps<'div'>, UseTabsProps>

export const Tabs = defineComponent({
  name: 'Tabs',
  props,
  emits,
  slots: {} as SlotsType<{
    default: (_api: UseTabsReturn) => VNode[]
  }>,

  setup(props, { slots, attrs, emit }) {
    const api = useTabs(props, emit)
    TabsProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api)}
      </ark.div>
    )
  },
})
