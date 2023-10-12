import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

type PaginationItemParams = {
  children: JSX.Element
  value: number
}

export type PaginationItemProps = Assign<HTMLArkProps<'li'>, PaginationItemParams>

export const PaginationItem = (props: PaginationItemProps) => {
  const [itemParams, liProps] = createSplitProps<Omit<PaginationItemParams, 'children'>>()(props, [
    'value',
  ])
  const pagination = usePaginationContext()

  const getChildren = children(() => props.children)
  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(
        children,
        pagination().getItemProps({
          type: 'page',
          value: itemParams.value,
        }),
      )
    }
  })

  return <ark.li {...liProps}>{getChildren()}</ark.li>
}
