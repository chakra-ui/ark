import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipPositionerProps extends HTMLArkProps<'div'> {}

export const TooltipPositioner = (props: TooltipPositionerProps) => {
  const api = useTooltipContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
