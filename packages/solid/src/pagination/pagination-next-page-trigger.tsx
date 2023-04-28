import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageTriggerProps = HTMLArkProps<'li'> & { children: JSX.Element }

export const PaginationNextPageTrigger = (props: PaginationNextPageTriggerProps) => {
  const pagination = usePaginationContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, pagination().nextPageTriggerProps)
    }
  })

  return <ark.li {...props}>{getChildren()}</ark.li>
}
