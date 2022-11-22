import { children, createEffect, JSX } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextItemProps = HTMLArkProps<'li'> & { children: JSX.Element }

export const PaginationNextItem = (props: PaginationNextItemProps) => {
  const { nextItemProps } = usePaginationContext()

  const c = children(() => props.children)
  createEffect(() => {
    const child = c()
    if (!(child instanceof Node)) {
      throw new Error('Expected to receive single element child of instance Node')
    }
    Object.assign(child, nextItemProps)
  })

  return <ark.li {...props}>{c()}</ark.li>
}
