import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { usePaginationContext } from './pagination-context'

export interface PaginationNextTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationNextTrigger = defineComponent<PaginationNextTriggerProps>(
  (_, { slots, attrs }) => {
    const api = usePaginationContext()

    return () => (
      <ark.button {...api.value.nextTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'PaginationNextTrigger',
  },
)
