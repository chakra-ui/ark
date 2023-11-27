import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'
import { useComboboxItemContext } from './combobox-item-context'

export type ComboboxItemIndicatorProps = HTMLArkProps<'div'>

export const ComboboxItemIndicator = defineComponent({
  name: 'ComboboxItemIndicator',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()
    const itemProps = useComboboxItemContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
