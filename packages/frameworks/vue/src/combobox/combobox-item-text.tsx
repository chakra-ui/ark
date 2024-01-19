import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'
import { useComboboxItemContext } from './combobox-item-context'

export interface ComboboxItemTextProps extends HTMLArkProps<'span'> {}

export const ComboboxItemText = defineComponent<ComboboxItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()
    const itemProps = useComboboxItemContext()

    return () => (
      <ark.span {...api.value.getItemTextProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'ComboboxItemText',
  },
)
