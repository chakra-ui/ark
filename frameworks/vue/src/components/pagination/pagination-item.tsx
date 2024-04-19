import type { ItemProps } from '@zag-js/pagination'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

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
