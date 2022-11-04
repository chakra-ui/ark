import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps } from '../split-props'
import { usePaginationContext } from './pagination-context'

export type PaginationPageProps = Assign<HTMLAtlasProps<'a'>, { value: number }>

export const PaginationPage = forwardRef<'a', PaginationPageProps>((props, ref) => {
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
