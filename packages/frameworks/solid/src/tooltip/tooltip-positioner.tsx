import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './tooltip-context'

export interface TooltipPositionerProps extends HTMLArkProps<'div'> {}

export const TooltipPositioner: ArkComponent<'div'> = (props: TooltipPositionerProps) => {
  const api = useTooltipContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
