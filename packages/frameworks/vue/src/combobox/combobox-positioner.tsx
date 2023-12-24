import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxPositionerProps extends HTMLArkProps<'div'> {}

export const ComboboxPositioner = defineComponent<ComboboxPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()

    return () => (
      <ark.ul {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.ul>
    )
  },
  {
    name: 'ComboboxPositioner',
  },
)
