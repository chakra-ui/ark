import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLAtlasProps<'span'>, { index: number }>

export const PaginationEllipsis = forwardRef<'span', PaginationEllipsisProps>((props, ref) => {
  const { getEllipsisProps } = usePaginationContext()
  const [{ index }, htmlProps] = splitProps(props, ['index'])
  return <atlas.span {...getEllipsisProps({ index })} {...htmlProps} ref={ref} />
})
