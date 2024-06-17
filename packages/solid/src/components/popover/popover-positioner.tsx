import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverPositionerProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    PopoverPositionerBaseProps {}

export const PopoverPositioner = (props: PopoverPositionerProps) => {
  const api = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
