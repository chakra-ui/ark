import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxControlProps extends HTMLArkProps<'div'> {}

export const ComboboxControl = defineComponent<ComboboxControlProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxControl',
  },
)
