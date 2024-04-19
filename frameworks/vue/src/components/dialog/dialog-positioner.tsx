import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogPositionerProps extends HTMLArkProps<'div'> {}

export const DialogPositioner = defineComponent<DialogPositionerProps>(
  (_, { slots, attrs }) => {
    const dialog = useDialogContext()
    const presencedialog = usePresenceContext()

    return () =>
      presencedialog.value.isUnmounted ? null : (
        <ark.div {...dialog.value.positionerProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'DialogPositioner',
  },
)
