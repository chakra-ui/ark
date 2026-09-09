import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useDialogContext } from './use-dialog-context.ts'
import type { PositionerState } from '@zag-js/dialog'

export interface DialogPositionerState extends PositionerState {}

export interface DialogPositionerBaseProps extends PolymorphicProps<'div', DialogPositionerState> {}
export interface DialogPositionerProps extends HTMLProps<'div'>, DialogPositionerBaseProps {}

export const DialogPositioner = (props: DialogPositionerProps) => {
  const api = useDialogContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} state={api().getPositionerState()} />
    </Show>
  )
}
