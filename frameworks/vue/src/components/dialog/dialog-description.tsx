import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogDescriptionProps extends HTMLArkProps<'div'> {}

export const DialogDescription = defineComponent<DialogDescriptionProps>(
  (_, { slots, attrs }) => {
    const dialog = useDialogContext()

    return () => (
      <ark.p {...dialog.value.descriptionProps} {...attrs}>
        {slots.default?.()}
      </ark.p>
    )
  },
  {
    name: 'DialogDescription',
  },
)
