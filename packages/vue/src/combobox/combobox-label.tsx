import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxLabelProps = HTMLArkProps<'label'>

export const ComboboxLabel: ComponentWithProps<ComboboxLabelProps> = defineComponent({
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
