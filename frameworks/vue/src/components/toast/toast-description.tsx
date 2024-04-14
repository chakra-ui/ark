import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useToastContext } from './toast-context'

export interface ToastDescriptionProps extends HTMLArkProps<'div'> {}

export const ToastDescription = defineComponent<ToastDescriptionProps>(
  (_, { attrs, slots }) => {
    const api = useToastContext()

    return () => (
      <ark.div {...api.value.descriptionProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ToastDescription',
  },
)
