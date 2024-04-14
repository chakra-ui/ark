import type { ItemProps } from '@zag-js/combobox'
import { type PropType, computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { useComboboxContext } from './combobox-context'
import { ComboboxItemProvider } from './combobox-item-context'

export interface ComboboxItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const ComboboxItem = defineComponent<ComboboxItemProps>(
  (props, { slots, attrs }) => {
    const api = useComboboxContext()
    ComboboxItemProvider(computed(() => props))

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemState(props))}
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
