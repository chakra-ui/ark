import type { JSX } from 'solid-js'
import { children, createEffect } from 'solid-js'
import { spread } from 'solid-js/web'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevItemProps = HTMLArkProps<'li'> & { children: JSX.Element }

export const PaginationPrevItem = (props: PaginationPrevItemProps) => {
  const pagination = usePaginationContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, pagination().prevItemProps)
    }
  })

  return <ark.li {...props}>{getChildren()}</ark.li>
}
