import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
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
