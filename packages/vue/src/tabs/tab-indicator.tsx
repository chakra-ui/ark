import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useTabsContext } from './tabs-context'

export type TabIndicatorProps = HTMLArkProps<'div'>

export const TabIndicator: ComponentWithProps<TabIndicatorProps> = defineComponent({
  name: 'TabIndicator',
  setup(_, { slots, attrs }) {
    const api = useTabsContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
