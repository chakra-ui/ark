import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationNextTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationNextTrigger = (props: PaginationNextTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().nextTriggerProps, props)

  return <ark.button {...mergedProps} />
}
