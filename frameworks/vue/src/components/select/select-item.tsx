import type { ItemProps } from '@zag-js/select'
import { type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemProvider } from './use-select-item-context'
import { SelectItemPropsProvider } from './use-select-item-props-context'

export interface SelectItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const SelectItem = defineComponent<SelectItemProps>(
  (props, { slots, attrs }) => {
    const api = useSelectContext()

    SelectItemPropsProvider(props)
    SelectItemProvider(computed(() => api.value.getItemState(props)))

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
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
