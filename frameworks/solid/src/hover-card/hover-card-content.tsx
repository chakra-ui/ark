import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardContentProps extends HTMLArkProps<'div'> {}

export const HoverCardContent = (props: HoverCardContentProps) => {
  const api = useHoverCardContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().contentProps,
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps()} />
    </Show>
  )
}
