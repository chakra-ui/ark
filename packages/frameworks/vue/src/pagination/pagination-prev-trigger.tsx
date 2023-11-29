import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevTriggerProps = HTMLArkProps<'button'>

export const PaginationPrevTrigger: ComponentWithProps<PaginationPrevTriggerProps> =
  defineComponent({
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
