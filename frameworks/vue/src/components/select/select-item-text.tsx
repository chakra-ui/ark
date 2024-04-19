import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

export interface SelectItemTextProps extends HTMLArkProps<'span'> {}

export const SelectItemText = defineComponent<SelectItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()
    const itemProps = useSelectItemPropsContext()

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
