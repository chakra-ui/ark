import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useToastContext } from './toast-context'

export interface ToastTitleProps extends HTMLArkProps<'div'> {}

export const ToastTitle = defineComponent<ToastTitleProps>(
  (_, { attrs, slots }) => {
    const api = useToastContext()

    return () => (
      <ark.div {...api.value.titleProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ToastTitle',
  },
)
