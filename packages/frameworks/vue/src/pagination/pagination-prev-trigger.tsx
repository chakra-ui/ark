import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export interface PaginationPrevTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationPrevTrigger = defineComponent({
  name: 'PaginationPrevTrigger',
  setup(_, { slots, attrs }) {
    const api = usePaginationContext()

    return () => (
      <ark.button {...api.value.prevTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
