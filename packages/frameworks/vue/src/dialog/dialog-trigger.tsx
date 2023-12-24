import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogTriggerProps extends HTMLArkProps<'button'> {}

export const DialogTrigger = defineComponent<DialogTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DialogTrigger',
  },
)
