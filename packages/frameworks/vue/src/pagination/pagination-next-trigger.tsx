import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationNextTriggerProps = HTMLArkProps<'button'>

export const PaginationNextTrigger: ComponentWithProps<PaginationNextTriggerProps> =
  defineComponent({
    name: 'PaginationNextTrigger',
    setup(_, { slots, attrs }) {
      const api = usePaginationContext()
      return () => (
        <ark.button {...api.value.nextTriggerProps} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.button>
      )
    },
  })
