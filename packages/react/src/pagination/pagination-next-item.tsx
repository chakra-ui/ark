import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextItemProps = HTMLAtlasProps<'a'>

export const PaginationNextItem = forwardRef<'a', PaginationNextItemProps>((props, ref) => {
  const { nextItemProps } = usePaginationContext()
  return <atlas.a href="#next" {...nextItemProps} {...props} ref={ref} />
})
