import { Show, type ComponentProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useDialogContext } from './dialog-context'

export type DialogPortalProps = ComponentProps<typeof Portal>

export const DialogPortal = (props: DialogPortalProps) => {
  const dialog = useDialogContext()
  return (
    <Show when={dialog().isOpen}>
      <Portal {...props} />
    </Show>
  )
}
