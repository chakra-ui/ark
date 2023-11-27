import type { ItemGroupLabelProps } from '@zag-js/combobox'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxItemGroupLabelProps = HTMLArkProps<'div'> & ItemGroupLabelProps

export const ComboboxItemGroupLabel = defineComponent({
  name: 'ComboboxItemGroupLabel',
  props: {
    htmlFor: {
      type: String as PropType<ComboboxItemGroupLabelProps['htmlFor']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.getItemGroupLabelProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
