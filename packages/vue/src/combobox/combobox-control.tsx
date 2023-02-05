import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxControlProps = HTMLArkProps<'div'>

export const ComboboxControl: ComponentWithProps<ComboboxControlProps> = defineComponent({
  name: 'ComboboxControl',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
