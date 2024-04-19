import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

export interface ComboboxItemIndicatorProps extends HTMLArkProps<'div'> {}

export const ComboboxItemIndicator = defineComponent<ComboboxItemIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()
    const itemProps = useComboboxItemPropsContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxItemIndicator',
  },
)
