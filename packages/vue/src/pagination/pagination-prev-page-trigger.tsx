import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageTriggerProps = HTMLArkProps<'button'>

export const PaginationPrevPageTrigger: ComponentWithProps<PaginationPrevPageTriggerProps> =
  defineComponent({
    name: 'PaginationPrevPageTrigger',
    setup(_, { slots, attrs }) {
      const api = usePaginationContext()
      return () => (
        <ark.button {...attrs} {...api.value.prevPageTriggerProps}>
          {() => getValidChildren(slots)}
        </ark.button>
      )
    },
  })
