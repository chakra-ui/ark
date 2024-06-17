import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationPrevTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    PaginationPrevTriggerBaseProps {}

export const PaginationPrevTrigger = (props: PaginationPrevTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
