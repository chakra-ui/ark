import { type PropType, computed, defineComponent } from 'vue'
import { useId } from '../../utils'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemGroupPropsProvider } from './use-select-item-group-props-context'

export interface SelectItemGroupProps extends HTMLArkProps<'div'> {}

export const SelectItemGroup = defineComponent<SelectItemGroupProps>(
  (props, { slots, attrs }) => {
    const select = useSelectContext()
    const id = useId()
    const itemGroupProps = computed(() => ({ id: props.id ? props.id : id.value }))

    SelectItemGroupPropsProvider(itemGroupProps.value)
    return () => (
      <ark.div {...select.value.getItemGroupProps(itemGroupProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SelectItemGroup',
    props: {
      id: {
        type: String as PropType<SelectItemGroupProps['id']>,
        required: false,
      },
    },
  },
)
