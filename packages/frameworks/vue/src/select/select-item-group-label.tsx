import type { ItemGroupLabelProps } from '@zag-js/select'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectItemGroupLabelProps = HTMLArkProps<'div'> & ItemGroupLabelProps

export const SelectItemGroupLabel = defineComponent({
  name: 'SelectItemGroupLabel',
  props: {
    htmlFor: {
      type: String as PropType<SelectItemGroupLabelProps['htmlFor']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.getItemGroupLabelProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
