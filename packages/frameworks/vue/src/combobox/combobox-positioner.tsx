import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxPositionerProps = HTMLArkProps<'div'>

export const ComboboxPositioner = defineComponent({
  name: 'ComboboxPositioner',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.ul {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.ul>
    )
  },
})
