import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { usePaginationContext } from './pagination-context'

export type PaginationItemProps = Assign<HTMLAtlasProps<'a'>, { value: number }>

export const PaginationItem = forwardRef<'a', PaginationItemProps>((props, ref) => {
  const { getItemProps } = usePaginationContext()
  const [{ value }, htmlProps] = splitProps(props, ['value'])
  return (
    <atlas.a
      href={`#${value}`}
      {...getItemProps({ type: 'page', value })}
      {...htmlProps}
      ref={ref}
    />
  )
})
