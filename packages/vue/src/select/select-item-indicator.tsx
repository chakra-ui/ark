import type { ItemProps } from '@zag-js/select'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useSelectContext } from './select-context'

export type SelectItemIndicatorProps = HTMLArkProps<'div'> & ItemProps

export const SelectItemIndicator = defineComponent({
  name: 'SelectItemIndicator',
  props: {
    item: {
      type: Object as PropType<SelectItemIndicatorProps['item']>,
      required: true,
    },
  },

  setup(props, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(props)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
