import { defineComponent, h } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useUniqueChild, type ComponentWithProps } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageTriggerProps = HTMLArkProps<'li'>

export const PaginationPrevPageTrigger: ComponentWithProps<PaginationPrevPageTriggerProps> =
  defineComponent({
    name: 'PaginationPrevPageTrigger',
    setup(_, { slots, attrs }) {
      const api = usePaginationContext()
      return () => {
        const DefaultSlot = useUniqueChild(slots, 'PaginationPrevPageTrigger')

        return (
          <ark.li {...attrs}>{() => h(DefaultSlot, { ...api.value.prevPageTriggerProps })}</ark.li>
        )
      }
    },
  })
