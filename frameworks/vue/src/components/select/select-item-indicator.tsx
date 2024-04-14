import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useSelectContext } from './select-context'
import { useSelectItemContext } from './select-item-context'

export interface SelectItemIndicatorProps extends HTMLArkProps<'div'> {}

export const SelectItemIndicator = defineComponent<SelectItemIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()
    const itemProps = useSelectItemContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SelectItemIndicator',
  },
)
