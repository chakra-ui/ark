import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContentProps extends HTMLArkProps<'div'> {}

export const CollapsibleContent = (props: CollapsibleContentProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().contentProps, props)

  return (
    <Show when={!api().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
