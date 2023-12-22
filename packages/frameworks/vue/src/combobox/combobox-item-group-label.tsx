import type { ItemGroupLabelProps } from '@zag-js/combobox'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export interface ComboboxItemGroupLabelProps
  extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

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
