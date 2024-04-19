import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogCloseTriggerProps extends HTMLArkProps<'button'> {}

export const DialogCloseTrigger = defineComponent<DialogCloseTriggerProps>(
  (_, { slots, attrs }) => {
    const dialog = useDialogContext()

    return () => (
      <ark.button {...dialog.value.closeTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DialogCloseTrigger',
  },
)
