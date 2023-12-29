import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'
import { useSelectItemContext } from './select-item-context'

export interface SelectItemTextProps extends HTMLArkProps<'span'> {}

export const SelectItemText = defineComponent<SelectItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()
    const itemProps = useSelectItemContext()

    return () => (
      <ark.span {...api.value.getItemTextProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'SelectItemText',
  },
)
