import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { emits, props } from './tabs.props'
import { useTabs, type UseTabsProps } from './use-tabs'

export type TabsProps = Assign<HTMLArkProps<'div'>, UseTabsProps>

export const Tabs = defineComponent({
  name: 'Tabs',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useTabs(props, emit)
    TabsProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.({
          selectedValue: api.value.value,
          focusedValue: api.value.focusedValue,
        })}
      </ark.div>
    )
  },
})
