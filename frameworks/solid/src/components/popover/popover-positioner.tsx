import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '../../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverPositionerProps extends HTMLArkProps<'div'> {}

export const PopoverPositioner = (props: PopoverPositionerProps) => {
  const api = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
