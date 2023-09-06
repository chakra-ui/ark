import type { ItemProps } from '@zag-js/select'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useSelectContext } from './select-context'

export type SelectItemProps = HTMLArkProps<'div'> & ItemProps

export const SelectItem = defineComponent({
  name: 'SelectItem',
  props: {
    item: {
      type: Object as PropType<SelectItemProps['item']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
