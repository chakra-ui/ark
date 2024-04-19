import type { ItemProps } from '@zag-js/combobox'
import { type PropType, computed, defineComponent, ref } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { ComboboxItemProvider } from './use-combobox-item-context'
import { ComboboxItemPropsProvider } from './use-combobox-item-props-context'

export interface ComboboxItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const ComboboxItem = defineComponent<ComboboxItemProps>(
  (props, { slots, attrs }) => {
    const combobox = useComboboxContext()
    ComboboxItemPropsProvider(props)
    ComboboxItemProvider(computed(() => combobox.value.getItemState(props)))

    return () => (
      <ark.div {...combobox.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxItem',
    props: {
      item: {
        type: Object as PropType<ComboboxItemProps['item']>,
        required: true,
      },
    },
  },
)
