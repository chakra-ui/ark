import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastActionTriggerProps extends HTMLArkProps<'button'> {}

export const ToastActionTrigger = defineComponent<ToastActionTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useToastContext()

    return () => (
      <ark.button {...api.value.actionTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ToastActionTrigger',
  },
)
