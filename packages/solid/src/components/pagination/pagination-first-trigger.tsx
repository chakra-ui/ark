import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationFirstTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationFirstTriggerProps extends HTMLProps<'button'>, PaginationFirstTriggerBaseProps {}

export const PaginationFirstTrigger = (props: PaginationFirstTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getFirstTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
