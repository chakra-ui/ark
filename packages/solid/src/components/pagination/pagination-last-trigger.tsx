import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationLastTriggerProps
  extends HTMLProps<'button'>, PaginationAnchorProps, PaginationLastTriggerBaseProps {}

export const PaginationLastTrigger = (props: PaginationLastTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getLastTriggerProps(), props)

  return (
    <Show when={api().type === 'button'} fallback={<ark.a {...(mergedProps as HTMLProps<'a'>)} />}>
      <ark.button {...mergedProps} />
    </Show>
  )
}
