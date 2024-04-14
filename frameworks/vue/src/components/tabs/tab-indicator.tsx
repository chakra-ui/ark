import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useTabsContext } from './tabs-context'

export interface TabIndicatorProps extends HTMLArkProps<'div'> {}

export const TabIndicator = defineComponent<TabIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useTabsContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TabIndicator',
  },
)
