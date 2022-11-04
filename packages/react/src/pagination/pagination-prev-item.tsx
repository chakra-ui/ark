import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevItemProps = HTMLAtlasProps<'a'>

export const PaginationPrevItem = forwardRef<'a', PaginationPrevItemProps>((props, ref) => {
  const { prevItemProps } = usePaginationContext()
  return <atlas.a href="#previous" {...prevItemProps} ref={ref} {...props} />
})
