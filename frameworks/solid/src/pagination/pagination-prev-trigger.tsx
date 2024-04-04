import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationPrevTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationPrevTrigger = (props: PaginationPrevTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().prevTriggerProps, props)

  return <ark.button {...mergedProps()} />
}
