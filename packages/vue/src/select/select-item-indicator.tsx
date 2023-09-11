import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useSelectContext } from './select-context'
import { useSelectItemContext } from './select-item-context'

export type SelectItemIndicatorProps = HTMLArkProps<'div'>

export const SelectItemIndicator = defineComponent({
  name: 'SelectItemIndicator',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()
    const itemProps = useSelectItemContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(itemProps)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
