import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogCloseTriggerProps extends HTMLArkProps<'button'> {}

export const DialogCloseTrigger = defineComponent({
  name: 'DialogCloseTrigger',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()

    return () => (
      <ark.button {...api.value.closeTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
