import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContentProps extends HTMLArkProps<'div'> {}

export const CollapsibleContent = (props: CollapsibleContentProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().contentProps, props)

  return (
    <Show when={!api().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
