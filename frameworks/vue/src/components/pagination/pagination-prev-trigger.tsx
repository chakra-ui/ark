import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { usePaginationContext } from './pagination-context'

export interface PaginationPrevTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationPrevTrigger = defineComponent<PaginationPrevTriggerProps>(
  (_, { slots, attrs }) => {
    const api = usePaginationContext()

    return () => (
      <ark.button {...api.value.prevTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'PaginationPrevTrigger',
  },
)
