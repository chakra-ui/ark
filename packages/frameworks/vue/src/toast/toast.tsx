import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export interface ToastProps extends HTMLArkProps<'li'> {}

export const Toast = defineComponent({
  name: 'Toast',
  setup(_, { attrs, slots }) {
    const api = useToastContext()

    return () => (
      <ark.li {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.li>
    )
  },
})
