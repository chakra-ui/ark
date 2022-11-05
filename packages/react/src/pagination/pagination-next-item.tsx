import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextItemProps = HTMLAtlasProps<'a'>

export const PaginationNextItem = forwardRef<'a', PaginationNextItemProps>((props, ref) => {
  const { nextItemProps } = usePaginationContext()
  const mergedProps = mergeProps(nextItemProps, props)
  return <atlas.a href="#next" {...mergedProps} ref={ref} />
})
