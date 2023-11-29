import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLArkProps<'div'>

export const TabList = defineComponent({
  name: 'TabList',
  setup(_, { slots, attrs }) {
    const api = useTabsContext()

    return () => (
      <ark.div {...api.value.tablistProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
