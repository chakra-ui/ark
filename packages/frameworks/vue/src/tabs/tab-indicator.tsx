import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabIndicatorProps = HTMLArkProps<'div'>

export const TabIndicator = defineComponent({
  name: 'TabIndicator',
  setup(_, { slots, attrs }) {
    const api = useTabsContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
