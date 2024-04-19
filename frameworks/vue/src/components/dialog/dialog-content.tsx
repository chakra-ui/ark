import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useDialogContext } from './use-dialog-context'

export interface DialogContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const DialogContent = defineComponent<DialogContentProps>(
  (_, { slots, attrs }) => {
    const dialog = useDialogContext()
    const presencedialog = usePresenceContext()

    return () => (
      <>
        {presencedialog.value.isUnmounted ? null : (
          <ark.div
            {...dialog.value.contentProps}
            {...presencedialog.value.presenceProps}
            {...attrs}
          >
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'DialogContent',
    props,
    emits,
  },
)
