import { type PropType, computed, defineComponent } from 'vue'
import { useId } from '../../utils'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { ComboboxItemGroupPropsProvider } from './use-combobox-item-group-props-context'

export interface ComboboxItemGroupProps extends HTMLArkProps<'div'> {}

export const ComboboxItemGroup = defineComponent<ComboboxItemGroupProps>(
  (props, { slots, attrs }) => {
    const combobox = useComboboxContext()
    const id = useId()
    const itemGroupProps = computed(() => ({ id: props.id ? props.id : id.value }))

    ComboboxItemGroupPropsProvider(itemGroupProps.value)
    return () => (
      <ark.div {...combobox.value.getItemGroupProps(itemGroupProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxItemGroup',
    props: {
      id: {
        type: String as PropType<ComboboxItemGroupProps['id']>,
        required: false,
      },
    },
  },
)
