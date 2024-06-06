import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogPositionerProps extends HTMLArkProps<'div'> {}

export const DialogPositioner = (props: DialogPositionerProps) => {
  const api = useDialogContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
