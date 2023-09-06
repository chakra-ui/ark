import type { ItemProps } from '@zag-js/combobox'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxItemProps = HTMLArkProps<'div'> & ItemProps

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

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
