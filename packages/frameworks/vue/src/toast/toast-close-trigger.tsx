import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export type ToastCloseTriggerProps = HTMLArkProps<'button'>

export const ToastCloseTrigger = defineComponent({
  name: 'ToastCloseTrigger',
  setup(_, { slots, attrs }) {
    const api = useToastContext()

    return () => (
      <ark.button {...api.value.closeTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
