import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps<'button' | 'a'> {}
export interface PaginationPrevTriggerProps
  extends Assign<HTMLProps<'button'>, PaginationAnchorProps>, PaginationPrevTriggerBaseProps {}

export const PaginationPrevTrigger = (props: PaginationPrevTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(), props)

  return (
    <Show when={api().type === 'button'} fallback={<ark.a {...(mergedProps as HTMLProps<'a'>)} />}>
      <ark.button {...(mergedProps as HTMLProps<'button'>)} />
    </Show>
  )
}
