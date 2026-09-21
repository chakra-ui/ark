import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationFirstTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationFirstTriggerProps extends HTMLProps<'button'>, PaginationFirstTriggerBaseProps {}

export const PaginationFirstTrigger = (props: PaginationFirstTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getFirstTriggerProps(), props)

  return (
    <Show when={api().type === 'button'} fallback={<ark.a {...(mergedProps as HTMLProps<'a'>)} />}>
      <ark.button {...mergedProps} />
    </Show>
  )
}
