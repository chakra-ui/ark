import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationFirstTriggerBaseProps extends PolymorphicProps<'button' | 'a'> {}
export interface PaginationFirstTriggerProps
  extends Assign<HTMLProps<'button'>, PaginationAnchorProps>, PaginationFirstTriggerBaseProps {}

export const PaginationFirstTrigger = (props: PaginationFirstTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getFirstTriggerProps(), props)

  return (
    <Show when={api().type === 'button'} fallback={<ark.a {...(mergedProps as HTMLProps<'a'>)} />}>
      <ark.button {...(mergedProps as HTMLProps<'button'>)} />
    </Show>
  )
}
