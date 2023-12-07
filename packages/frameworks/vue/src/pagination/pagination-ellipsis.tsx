import type { EllipsisProps } from '@zag-js/pagination'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export interface PaginationEllipsisProps extends Assign<HTMLArkProps<'div'>, EllipsisProps> {}

export const PaginationEllipsis = defineComponent({
  name: 'PaginationEllipsis',
  props: {
    index: {
      type: Number as PropType<EllipsisProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = usePaginationContext()

    return () => (
      <ark.div {...api.value.getEllipsisProps({ index: props.index })} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
