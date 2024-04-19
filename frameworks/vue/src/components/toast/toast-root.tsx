import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends HTMLArkProps<'div'> {}

export const ToastRoot = defineComponent<ToastRootProps>(
  (_, { attrs, slots }) => {
    const api = useToastContext()

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ToastRoot',
  },
)
