import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemGroupPropsContext } from './use-select-item-group-props-context'

export interface SelectItemGroupLabelProps extends HTMLArkProps<'div'> {}

export const SelectItemGroupLabel = defineComponent<SelectItemGroupLabelProps>(
  (_, { slots, attrs }) => {
    const select = useSelectContext()
    const itemGroupProps = useSelectItemGroupPropsContext()

    return () => (
      <ark.div {...select.value.getItemGroupLabelProps({ htmlFor: itemGroupProps.id })} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SelectItemGroupLabel',
  },
)
