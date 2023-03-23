import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxPositionerProps = HTMLArkProps<'div'>

export const ComboboxPositioner: ComponentWithProps<ComboboxPositionerProps> = defineComponent({
  name: 'ComboboxPositioner',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.ul {...api.value.positionerProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.ul>
    )
  },
})
