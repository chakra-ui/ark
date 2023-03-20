import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useSelectContext } from './select-context'

export interface SelectOptionGroupProps extends HTMLArkProps<'div'> {
  id: string
}

export const SelectOptionGroup: ComponentWithProps<SelectOptionGroupProps> = defineComponent({
  name: 'SelectOptionGroup',
  props: {
    id: String as PropType<SelectOptionGroupProps['id']>,
  },
  setup(props, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.getOptionGroupProps({ id: props.id as string })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
