import type { PageTriggerProps } from '@zag-js/pagination'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationPageTriggerProps = HTMLArkProps<'li'> & PageTriggerProps

export const PaginationPageTrigger: ComponentWithProps<Partial<PaginationPageTriggerProps>> =
  defineComponent({
    name: 'PaginationPageTrigger',
    props: {
      value: {
        type: Number as PropType<PaginationPageTriggerProps['value']>,
        required: true,
      },
    },
    setup(props, { slots, attrs }) {
      const api = usePaginationContext()
      return () => (
        <ark.button
          {...api.value.getPageTriggerProps({ type: 'page', value: props.value })}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </ark.button>
      )
    },
  })
