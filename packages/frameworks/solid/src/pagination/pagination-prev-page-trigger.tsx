import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageTriggerProps = HTMLArkProps<'li'> & { children: JSX.Element }

export const PaginationPrevPageTrigger = (props: PaginationPrevPageTriggerProps) => {
  const api = usePaginationContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, api().prevPageTriggerProps)
    }
  })

  return <ark.li {...props}>{getChildren()}</ark.li>
}
