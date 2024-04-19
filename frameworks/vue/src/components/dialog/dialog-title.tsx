import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogTitleProps extends HTMLArkProps<'h2'> {}

export const DialogTitle = defineComponent<DialogTitleProps>(
  (_, { slots, attrs }) => {
    const dialog = useDialogContext()

    return () => (
      <ark.h2 {...dialog.value.titleProps} {...attrs}>
        {slots.default?.()}
      </ark.h2>
    )
  },
  {
    name: 'DialogTitle',
  },
)
