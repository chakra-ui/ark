import type { PositionerState } from '@zag-js/popover'
import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverPositionerState extends PositionerState {}

export interface PopoverPositionerBaseProps extends PolymorphicProps<'div', PopoverPositionerState> {}
export interface PopoverPositionerProps extends HTMLProps<'div'>, PopoverPositionerBaseProps {}

export const PopoverPositioner = (props: PopoverPositionerProps) => {
  const api = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} state={api().getPositionerState()} />
    </Show>
  )
}
