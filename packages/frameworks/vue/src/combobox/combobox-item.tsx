import type { ItemProps } from '@zag-js/combobox'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'
import { ComboboxItemProvider } from './combobox-item-context'

export interface ComboboxItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const ComboboxItem = defineComponent({
  name: 'ComboboxItem',
  props: {
    item: {
      type: Object as PropType<ComboboxItemProps['item']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useComboboxContext()
    ComboboxItemProvider(computed(() => props))

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemState(props))}
      </ark.div>
    )
  },
})
