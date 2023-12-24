import type { ItemProps } from '@zag-js/pagination'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export interface PaginationItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const PaginationItem = defineComponent<PaginationItemProps>(
  (props, { slots, attrs }) => {
    const api = usePaginationContext()

    return () => (
      <ark.button {...api.value.getItemProps({ type: 'page', value: props.value })} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'PaginationItem',
    props: {
      type: {
        type: String as PropType<ItemProps['type']>,
        default: 'page',
      },
      value: {
        type: Number as PropType<ItemProps['value']>,
        required: true,
      },
    },
  },
)
