import type { ItemGroupProps } from '@zag-js/combobox'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxItemGroupProps = HTMLArkProps<'div'> & ItemGroupProps

export const ComboboxItemGroup: ComponentWithProps<ComboboxItemGroupProps> = defineComponent({
  name: 'ComboboxItemGroup',
  props: {
    id: {
      type: String as PropType<ComboboxItemGroupProps['id']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.getItemGroupProps(props)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
