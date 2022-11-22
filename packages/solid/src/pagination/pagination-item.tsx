import type { Assign } from '@polymorphic-factory/solid'
import { children, JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { usePaginationContext } from './pagination-context'

type PaginationItemParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: JSX.Element | ((props: JSX.HTMLAttributes<any>) => JSX.Element)
  value: number
}
export type PaginationItemProps = Assign<HTMLArkProps<'li'>, PaginationItemParams>

export const PaginationItem = (props: PaginationItemProps) => {
  const [itemParams, liProps] = createSplitProps<Omit<PaginationItemParams, 'children'>>()(props, [
    'value',
  ])
  const { getItemProps } = usePaginationContext()

  const view = children(() =>
    runIfFn(
      props.children,
      getItemProps({
        type: 'page',
        value: itemParams.value,
      }),
    ),
  )

  return <ark.li {...liProps}>{view()}</ark.li>
}
