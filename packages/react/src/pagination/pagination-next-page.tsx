import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageProps = HTMLAtlasProps<'a'>

export const PaginationNextPage = forwardRef<'a', PaginationNextPageProps>((props, ref) => {
  const { nextItemProps } = usePaginationContext()
  return <atlas.a href="#next" {...nextItemProps} {...props} ref={ref} />
})
