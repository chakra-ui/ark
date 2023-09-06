import type { ItemProps } from '@zag-js/combobox'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxItemIndicatorProps = HTMLArkProps<'div'> & ItemProps

export const ComboboxItemIndicator = defineComponent({
  name: 'ComboboxItemIndicator',
  props: {
    item: {
      type: Object as PropType<ComboboxItemIndicatorProps['item']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(props)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
