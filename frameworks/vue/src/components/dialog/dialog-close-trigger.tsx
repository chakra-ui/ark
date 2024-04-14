import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useDialogContext } from './dialog-context'

export interface DialogCloseTriggerProps extends HTMLArkProps<'button'> {}

export const DialogCloseTrigger = defineComponent<DialogCloseTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()

    return () => (
      <ark.button {...api.value.closeTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DialogCloseTrigger',
  },
)
