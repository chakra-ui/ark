import type { ComponentProps } from 'solid-js'
import { Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPortalProps = ComponentProps<typeof Portal>

export const HoverCardPortal = (props: HoverCardPortalProps) => {
  const hoverCard = useHoverCardContext()
  return (
    <Show when={hoverCard().isOpen}>
      <Portal {...props} />
    </Show>
  )
}
