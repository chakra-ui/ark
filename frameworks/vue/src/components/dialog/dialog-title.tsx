import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useDialogContext } from './dialog-context'

export interface DialogTitleProps extends HTMLArkProps<'h2'> {}

export const DialogTitle = defineComponent<DialogTitleProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()

    return () => (
      <ark.h2 {...api.value.titleProps} {...attrs}>
        {slots.default?.()}
      </ark.h2>
    )
  },
  {
    name: 'DialogTitle',
  },
)
