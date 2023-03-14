import { defineComponent, h } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, useUniqueChild } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageTriggerProps = HTMLArkProps<'li'>

export const PaginationNextPageTrigger: ComponentWithProps<PaginationNextPageTriggerProps> =
  defineComponent({
    name: 'PaginationNextPageTrigger',
    setup(_, { slots, attrs }) {
      const api = usePaginationContext()
      return () => {
        const DefaultSlot = useUniqueChild(slots, 'PaginationNextPageTrigger')

        return (
          <ark.li {...attrs}>{() => h(DefaultSlot, { ...api.value.nextPageTriggerProps })}</ark.li>
        )
      }
    },
  })
