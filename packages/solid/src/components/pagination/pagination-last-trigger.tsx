import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationLastTriggerProps extends HTMLProps<'button'>, PaginationLastTriggerBaseProps {}

export const PaginationLastTrigger = (props: PaginationLastTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getLastTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
