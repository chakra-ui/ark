import type { ItemProps } from '@zag-js/pagination'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationItemProps = HTMLArkProps<'li'> & ItemProps

export const PaginationItem = defineComponent({
  name: 'PaginationItem',
  props: {
    value: {
      type: Number as PropType<PaginationItemProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = usePaginationContext()
    return () => (
      <ark.button {...api.value.getItemProps({ type: 'page', value: props.value })} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
