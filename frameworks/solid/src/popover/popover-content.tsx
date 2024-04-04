import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverContentProps extends HTMLArkProps<'div'> {}

export const PopoverContent = (props: PopoverContentProps) => {
  const api = usePopoverContext()
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
