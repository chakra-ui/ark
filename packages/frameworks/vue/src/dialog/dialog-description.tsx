import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogDescriptionProps extends HTMLArkProps<'p'> {}

export const DialogDescription = defineComponent<DialogDescriptionProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()

    return () => (
      <ark.p {...api.value.descriptionProps} {...attrs}>
        {slots.default?.()}
      </ark.p>
    )
  },
  {
    name: 'DialogDescription',
  },
)
