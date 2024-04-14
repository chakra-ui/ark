import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './combobox-context'
import { useComboboxItemContext } from './combobox-item-context'

export interface ComboboxItemIndicatorProps extends HTMLArkProps<'div'> {}

export const ComboboxItemIndicator = defineComponent<ComboboxItemIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()
    const itemProps = useComboboxItemContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxItemIndicator',
  },
)
