import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxLabelProps = HTMLArkProps<'label'>

export const ComboboxLabel = defineComponent({
  name: 'ComboboxLabel',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
})
