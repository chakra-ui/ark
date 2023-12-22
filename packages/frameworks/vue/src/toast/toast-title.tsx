import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export interface ToastTitleProps extends HTMLArkProps<'div'> {}

export const ToastTitle = defineComponent({
  name: 'ToastTitle',
  setup(_, { attrs, slots }) {
    const api = useToastContext()

    return () => (
      <ark.div {...api.value.titleProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
