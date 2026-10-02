import type { ItemProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps<'button'> {}
export interface PaginationItemProps extends Assign<
  HTMLProps<'button'> & PaginationAnchorProps,
  PaginationItemBaseProps
> {}

export const PaginationItem = (props: PaginationItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'type'])

  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return (
    <Show when={api().type === 'button'} fallback={<ark.a {...(mergedProps as HTMLProps<'a'>)} />}>
      <ark.button {...mergedProps} />
    </Show>
  )
}
