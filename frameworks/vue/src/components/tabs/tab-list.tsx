import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useTabsContext } from './tabs-context'

export interface TabListProps extends HTMLArkProps<'div'> {}

export const TabList = defineComponent<TabListProps>(
  (_, { slots, attrs }) => {
    const api = useTabsContext()

    return () => (
      <ark.div {...api.value.listProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TabList',
  },
)
