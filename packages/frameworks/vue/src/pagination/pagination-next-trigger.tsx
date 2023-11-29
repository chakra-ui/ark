import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationNextTriggerProps = HTMLArkProps<'button'>

export const PaginationNextTrigger: ComponentWithProps<PaginationNextTriggerProps> =
  defineComponent({
    name: 'PaginationNextTrigger',
    setup(_, { slots, attrs }) {
      const api = usePaginationContext()
      return () => (
        <ark.button {...api.value.nextTriggerProps} {...attrs}>
          {slots.default?.()}
        </ark.button>
      )
    },
  })
