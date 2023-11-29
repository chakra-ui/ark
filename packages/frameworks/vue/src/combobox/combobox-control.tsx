import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxControlProps = HTMLArkProps<'div'>

export const ComboboxControl: ComponentWithProps<ComboboxControlProps> = defineComponent({
  name: 'ComboboxControl',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
