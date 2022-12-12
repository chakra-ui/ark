import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageTriggerProps = HTMLArkProps<'li'> & { children: JSX.Element }

export const PaginationNextPageTrigger = (props: PaginationNextPageTriggerProps) => {
  const pagination = usePaginationContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, pagination().nextPageTriggerProps)
    }
  })

  return <ark.li {...props}>{getChildren()}</ark.li>
}
