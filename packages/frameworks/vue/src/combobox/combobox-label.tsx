import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxLabelProps = HTMLArkProps<'label'>

export const ComboboxLabel = defineComponent({
  name: 'ComboboxLabel',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})
