import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContentBaseProps extends PolymorphicProps<'div'> {}
export interface CollapsibleContentProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    CollapsibleContentBaseProps {}

export const CollapsibleContent = (props: CollapsibleContentProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().getContentProps(), props)

  return (
    <Show when={!api().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
