import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLArkProps<'div'>

export const TooltipPositioner = (props: TooltipPositionerProps) => {
  const api = useTooltipContext()
  const positionerProps = mergeProps(() => api().positionerProps, props)
  return (
    <Show when={api().isOpen}>
      <ark.div {...positionerProps} />
    </Show>
  )
}
