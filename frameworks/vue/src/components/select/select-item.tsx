import type { ItemProps } from '@zag-js/select'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { SelectItemProvider } from './select-item-context'
import { useSelectContext } from './use-select-context'

export interface SelectItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const SelectItem = defineComponent<SelectItemProps>(
  (props, { slots, attrs }) => {
    const api = useSelectContext()
    SelectItemProvider(props)

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemState(props))}
      </ark.div>
    )
  },
  {
    name: 'SelectItem',
    props: {
      item: {
        type: Object as PropType<SelectItemProps['item']>,
        required: true,
      },
    },
  },
)
