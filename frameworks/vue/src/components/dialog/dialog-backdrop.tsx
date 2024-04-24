import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useDialogContext } from './use-dialog-context'

export interface DialogBackdropProps extends HTMLArkProps<'div'>, PresenceProps {}

export const DialogBackdrop = defineComponent<DialogBackdropProps>(
  (_, { slots, attrs }) => {
    const dialog = useDialogContext()
    const presencedialog = usePresenceContext()

    return () =>
      presencedialog.value.unmounted ? null : (
        <ark.div {...dialog.value.backdropProps} {...presencedialog.value.presenceProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'DialogBackdrop',
    props,
    emits,
  },
)
