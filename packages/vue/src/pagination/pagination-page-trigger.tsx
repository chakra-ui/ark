import { defineComponent, h, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, useUniqueChild } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationPageTriggerProps = HTMLArkProps<'li'> & {
  value: number
}

export const PaginationPageTrigger: ComponentWithProps<PaginationPageTriggerProps> =
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
      return () => {
        const DefaultSlot = useUniqueChild(slots, 'PaginationPageTrigger')

        return (
          <ark.li {...attrs}>
            {() =>
              h(DefaultSlot, {
                ...api.value.getPageTriggerProps({ type: 'page', value: props.value }),
              })
            }
          </ark.li>
        )
      }
    },
  })
