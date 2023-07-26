import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageTriggerProps = HTMLArkProps<'button'>

export const PaginationNextPageTrigger: ComponentWithProps<PaginationNextPageTriggerProps> =
  defineComponent({
    name: 'PaginationNextPageTrigger',
    setup(_, { slots, attrs }) {
      const api = usePaginationContext()
      return () => (
        <ark.button {...attrs} {...api.value.nextPageTriggerProps}>
          {() => getValidChildren(slots)}
        </ark.button>
      )
    },
  })
