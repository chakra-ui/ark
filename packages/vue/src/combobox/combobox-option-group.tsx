import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export interface ComboboxOptionGroupProps extends HTMLArkProps<'ul'> {
  id: string
}

export const ComboboxOptionGroup: ComponentWithProps<ComboboxOptionGroupProps> = defineComponent({
  name: 'ComboboxOptionGroup',
  props: {
    id: String as PropType<ComboboxOptionGroupProps['id']>,
  },
  setup(props, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.getOptionGroupProps({ id: props.id as string })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
