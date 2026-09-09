import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import type { ContentState } from '@zag-js/collapsible'

export interface CollapsibleContentState extends ContentState {}

export interface CollapsibleContentBaseProps extends PolymorphicProps<'div', CollapsibleContentState> {}
export interface CollapsibleContentProps extends HTMLProps<'div'>, CollapsibleContentBaseProps {}

export const CollapsibleContent = (props: CollapsibleContentProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().getContentProps(), props)

  return (
    <Show when={!api().unmounted}>
      <ark.div {...mergedProps} state={api().getContentState()} />
    </Show>
  )
}
