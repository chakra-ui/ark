import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export interface ToastDescriptionProps extends HTMLArkProps<'div'> {}

export const ToastDescription = defineComponent({
  name: 'ToastDescription',
  setup(_, { attrs, slots }) {
    const api = useToastContext()

    return () => (
      <ark.div {...api.value.descriptionProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
