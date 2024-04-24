import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UsePaginationContext, usePaginationContext } from './use-pagination-context'

export type PaginationContextProps = SlotsType<{
  default: UnwrapRef<UsePaginationContext>
}>

export const PaginationContext = defineComponent(
  (_, { slots }) => {
    const pagination = usePaginationContext()

    return () => slots.default(pagination.value)
  },
  {
    name: 'PaginationContext',
    slots: Object as PaginationContextProps,
  },
)
