import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLAtlasProps<'span'>, { index: number }>

export const PaginationEllipsis = forwardRef<'span', PaginationEllipsisProps>((props, ref) => {
  const { getEllipsisProps } = usePaginationContext()
  const [{ index }, htmlProps] = splitProps(props, ['index'])
  const mergedProps = mergeProps(getEllipsisProps({ index }), htmlProps)
  return <atlas.span {...mergedProps} ref={ref} />
})
