import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevItemProps = HTMLAtlasProps<'a'>

export const PaginationPrevItem = forwardRef<'a', PaginationPrevItemProps>((props, ref) => {
  const { prevItemProps } = usePaginationContext()
  const mergedProps = mergeProps(prevItemProps, props)
  return <atlas.a href="#previous" {...mergedProps} ref={ref} />
})
