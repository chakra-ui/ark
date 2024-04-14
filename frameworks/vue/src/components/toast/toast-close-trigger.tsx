import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useToastContext } from './toast-context'

export interface ToastCloseTriggerProps extends HTMLArkProps<'button'> {}

export const ToastCloseTrigger = defineComponent<ToastCloseTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useToastContext()

    return () => (
      <ark.button {...api.value.closeTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ToastCloseTrigger',
  },
)
