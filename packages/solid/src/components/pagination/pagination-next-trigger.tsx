import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationNextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationNextTriggerProps
  extends HTMLProps<'button'>,
    PaginationNextTriggerBaseProps {}

export const PaginationNextTrigger = (props: PaginationNextTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getNextTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
