import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLArkProps<'div'>

export const TooltipPositioner = (props: TooltipPositionerProps) => {
  const tooltip = useTooltipContext()

  return (
    <Show when={tooltip().isOpen}>
      <ark.div {...tooltip().positionerProps} {...props} />
    </Show>
  )
}
