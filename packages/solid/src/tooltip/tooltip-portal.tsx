import { Portal, Show } from 'solid-js/web'
import { useTooltipContext } from './tooltip-context'

export type TooltipPortalProps = Parameters<typeof Portal>[0]

export const TooltipPortal = (props: TooltipPortalProps) => {
  const tooltip = useTooltipContext()

  return (
    <Show when={tooltip().isOpen}>
      <Portal {...props} />
    </Show>
  )
}
