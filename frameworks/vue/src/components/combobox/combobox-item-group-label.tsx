import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context'

export interface ComboboxItemGroupLabelProps extends HTMLArkProps<'div'> {}

export const ComboboxItemGroupLabel = defineComponent<ComboboxItemGroupLabelProps>(
  (_, { slots, attrs }) => {
    const combobox = useComboboxContext()
    const itemGroupProps = useComboboxItemGroupPropsContext()

    return () => (
      <ark.div
        {...combobox.value.getItemGroupLabelProps({ htmlFor: itemGroupProps.id })}
        {...attrs}
      >
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxItemGroupLabel',
  },
)
