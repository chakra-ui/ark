import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationPrevTriggerProps
  extends HTMLProps<'button'>,
    PaginationPrevTriggerBaseProps {}

export const PaginationPrevTrigger = (props: PaginationPrevTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
