import type { JSX } from 'solid-js'
import { children, createEffect } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevItemProps = HTMLArkProps<'li'> & { children: JSX.Element }

export const PaginationPrevItem = (props: PaginationPrevItemProps) => {
  const { prevItemProps } = usePaginationContext()

  const c = children(() => props.children)
  createEffect(() => {
    const child = c()
    if (!(child instanceof Node)) {
      throw new Error('Expected to receive single element child of instance Node')
    }
    Object.assign(child, prevItemProps)
  })

  return <ark.li {...props}>{c()}</ark.li>
}
