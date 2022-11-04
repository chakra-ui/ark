import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageProps = HTMLAtlasProps<'a'>

export const PaginationPrevPage = forwardRef<'a', PaginationPrevPageProps>((props, ref) => {
  const { prevItemProps } = usePaginationContext()
  return <atlas.a href="#previous" {...prevItemProps} ref={ref} {...props} />
})
