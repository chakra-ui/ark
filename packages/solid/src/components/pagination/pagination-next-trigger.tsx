import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationNextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationNextTriggerProps
  extends HTMLProps<'button'>, PaginationAnchorProps, PaginationNextTriggerBaseProps {}

export const PaginationNextTrigger = (props: PaginationNextTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getNextTriggerProps(), props)

  return (
    <Show when={api().type === 'button'} fallback={<ark.a {...(mergedProps as HTMLProps<'a'>)} />}>
      <ark.button {...mergedProps} />
    </Show>
  )
}
