import type { ComponentProps } from 'solid-js'
import { Portal, Show } from 'solid-js/web'
import { useTooltipContext } from './tooltip-context'

export type TooltipPortalProps = ComponentProps<typeof Portal>

export const TooltipPortal = (props: TooltipPortalProps) => {
  const tooltip = useTooltipContext()

  return (
    <Show when={tooltip().isOpen}>
      <Portal {...props} />
    </Show>
  )
}
