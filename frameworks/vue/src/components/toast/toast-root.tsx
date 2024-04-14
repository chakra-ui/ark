import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useToastContext } from './toast-context'

export interface ToastRootProps extends HTMLArkProps<'li'> {}

export const ToastRoot = defineComponent<ToastRootProps>(
  (_, { attrs, slots }) => {
    const api = useToastContext()

    return () => (
      <ark.li {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.li>
    )
  },
  {
    name: 'ToastRoot',
  },
)
